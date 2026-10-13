import { describe, expect, it, vi } from 'vitest';
import {
	ABORT_ERROR_MESSAGE,
	DELETE_ERROR_MESSAGE,
	FileUploaderStore,
	type FileUploaderStoreOptions,
	UPLOAD_ERROR_MESSAGE,
} from './store.svelte';
import type {
	FileUploaderMetaInfo,
	FileUploaderNotify,
	FileUploaderUploadOptions,
	UploadedFileData,
	UploadFile,
} from './types';

type Value = FileUploaderStoreOptions['value'];
type UploadMock = NonNullable<FileUploaderStoreOptions['onUploadFile']>;

function createDeferred<T>() {
	let resolve!: (value: T) => void;
	let reject!: (reason?: unknown) => void;
	const promise = new Promise<T>((promiseResolve, promiseReject) => {
		resolve = promiseResolve;
		reject = promiseReject;
	});

	return { promise, reject, resolve };
}

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

function createNotify(): FileUploaderNotify {
	return {
		error: vi.fn(() => 'error'),
		info: vi.fn(() => 'info'),
		success: vi.fn(() => 'success'),
		warning: vi.fn(() => 'warning'),
	};
}

const textFile = (name = 'document.txt', content = 'content') =>
	new File([content], name, { type: 'text/plain' });

const uploadedFile = (id: string, name: string): UploadFile => ({
	id,
	name,
	size: 1024,
	type: 'text/plain',
	url: `/files/${name}`,
});

/** Mirrors `bind:value`: every emitted value is written back and read by the store. */
function createStore(
	options: Partial<Omit<FileUploaderStoreOptions, 'setValue'>> = {},
) {
	const state: { value: Value } = { value: options.value ?? null };
	const setValue = vi.fn(
		(value: UploadFile | UploadFile[] | null, _?: FileUploaderMetaInfo) => {
			state.value = value;
		},
	);
	const store = new FileUploaderStore({
		id: 'uploader',
		...options,
		get value() {
			return state.value;
		},
		setValue,
	});
	const files = () => store.files;

	return { files, setValue, state, store };
}

describe('FileUploaderStore', () => {
	describe('derived text', () => {
		it('describes single uploader constraints', () => {
			const { store } = createStore({
				accept: ['.pdf', 'image/png'],
				maxFileSize: 5 * 1024,
			});

			expect(store.effectiveMaxFileCount).toBe(1);
			expect(store.constraints).toBe('До 5.00 КБ · PDF, PNG');
			expect(store.defaultPrompt).toBe(
				'Перетащите файл сюда или выберите на устройстве',
			);
		});

		it('describes multiple uploader constraints and limit', () => {
			const { store } = createStore({ isMultiple: true, maxFileCount: 5 });

			expect(store.constraints).toBe('Не более 5 файлов');
			expect(store.defaultPrompt).toBe(
				'Перетащите файлы сюда или выберите на устройстве',
			);
			expect(store.limitNotice).toBe(
				'Достигнут лимит в 5 файлов. Чтобы добавить новый, удалите один из текущих.',
			);
		});

		it('falls back to one file when maxFileCount is missing', () => {
			const { store } = createStore({ isMultiple: true });

			expect(store.effectiveMaxFileCount).toBe(1);
		});

		it('reports when the limit is reached', () => {
			const { store } = createStore({
				isMultiple: true,
				maxFileCount: 2,
				value: [uploadedFile('file-1', 'a.txt')],
			});

			expect(store.isLimitReached).toBe(false);

			store.addFiles([textFile('b.txt')], 'fileInput');

			expect(store.isLimitReached).toBe(true);
		});
	});

	describe('adding files', () => {
		it('emits a single file with its input source', () => {
			const { setValue, state, store } = createStore();
			const file = textFile();

			store.addFiles([file], 'fileInput');

			expect(setValue).toHaveBeenCalledWith(
				expect.objectContaining({
					id: 'uploader-0',
					name: 'document.txt',
					file,
				}),
				{ inputSourceType: 'fileInput' },
			);
			expect(state.value).not.toBeInstanceOf(Array);
		});

		it('does not add a second file in single mode', () => {
			const { files, store } = createStore({
				value: uploadedFile('file-1', 'old.txt'),
			});

			store.addFiles([textFile('new.txt')], 'fileInput');
			expect(files().map(({ name }) => name)).toEqual(['old.txt']);
		});

		it('appends files in multiple mode', () => {
			const { files, setValue, store } = createStore({
				isMultiple: true,
				maxFileCount: 5,
				value: [uploadedFile('file-1', 'a.txt')],
			});

			store.addFiles([textFile('b.txt'), textFile('c.txt')], 'dragAndDrop');

			expect(files().map(({ name }) => name)).toEqual([
				'a.txt',
				'b.txt',
				'c.txt',
			]);
			expect(setValue).toHaveBeenCalledWith(expect.any(Array), {
				inputSourceType: 'dragAndDrop',
			});
		});

		it('skips duplicates by name and size', () => {
			const existing = textFile('a.txt');
			const { files, store } = createStore({
				isMultiple: true,
				maxFileCount: 5,
				value: [{ ...uploadedFile('file-1', 'a.txt'), size: existing.size }],
			});

			store.addFiles(
				[existing, textFile('b.txt'), textFile('b.txt')],
				'fileInput',
			);

			expect(files().map(({ name }) => name)).toEqual(['a.txt', 'b.txt']);
		});

		it('adds only the available slots and warns about the rest', () => {
			const notify = createNotify();
			const { files, store } = createStore({
				isMultiple: true,
				maxFileCount: 2,
				notify,
				value: [uploadedFile('file-1', 'a.txt')],
			});

			store.addFiles([textFile('b.txt'), textFile('c.txt')], 'fileInput');

			expect(files().map(({ name }) => name)).toEqual(['a.txt', 'b.txt']);
			expect(notify.warning).toHaveBeenCalledWith('Не все файлы добавлены', {
				content: 'Можно загрузить не более 2',
			});
		});

		it('works without notify', () => {
			const { store } = createStore({
				isMultiple: true,
				maxFileCount: 1,
				value: [uploadedFile('file-1', 'a.txt')],
			});

			expect(() =>
				store.addFiles([textFile('b.txt')], 'fileInput'),
			).not.toThrow();
		});

		it('marks restricted files without uploading them', () => {
			const onUploadFile = vi.fn<UploadMock>();
			const { files, store } = createStore({ accept: ['.png'], onUploadFile });

			store.addFiles(
				[new File(['pdf'], 'document.pdf', { type: 'application/pdf' })],
				'fileInput',
			);

			expect(files()[0].status).toMatchObject({
				isRestrictionError: true,
				errorMsg: 'Тип файла недопустим',
			});
			expect(onUploadFile).not.toHaveBeenCalled();
		});

		it('applies custom restrictions', () => {
			const { files, store } = createStore({
				restrictions: [
					(file) =>
						file.name.startsWith('draft')
							? { code: 'draft', message: 'Черновики нельзя' }
							: undefined,
				],
			});

			store.addFiles([textFile('draft.txt')], 'fileInput');

			expect(files()[0].status?.errorMsg).toBe('Черновики нельзя');
		});

		it('ignores files while disabled', () => {
			const { setValue, store } = createStore({ isDisabled: true });

			store.addFiles([textFile()], 'fileInput');

			expect(setValue).not.toHaveBeenCalled();
		});

		it('generates unique ids', () => {
			const { files, store } = createStore({
				isMultiple: true,
				maxFileCount: 3,
			});

			store.addFiles([textFile('a.txt')], 'fileInput');
			store.addFiles([textFile('b.txt')], 'fileInput');

			expect(files().map(({ id }) => id)).toEqual(['uploader-0', 'uploader-1']);
		});
	});

	describe('uploading', () => {
		it('tracks progress and applies uploaded data', async () => {
			const deferred = createDeferred<UploadedFileData>();
			const onUploadFile = vi.fn<UploadMock>(() => deferred.promise);
			const { files, setValue, store } = createStore({ onUploadFile });
			const file = textFile();

			store.addFiles([file], 'fileInput');

			expect(onUploadFile).toHaveBeenCalledWith('uploader-0', file, {
				signal: expect.any(AbortSignal),
				setProgress: expect.any(Function),
			});
			expect(files()[0].status).toMatchObject({ isLoading: true, progress: 0 });

			const [fileId, , options] = onUploadFile.mock.calls[0];
			options.setProgress(fileId, { loaded: 5, total: 10 });

			expect(files()[0].status).toMatchObject({
				isLoading: true,
				progress: 50,
			});
			expect(setValue).toHaveBeenLastCalledWith(expect.anything(), {
				inputSourceType: 'fileInput',
			});

			deferred.resolve({
				id: fileId,
				name: 'document.txt',
				type: 'text/plain',
				url: '/files/document.txt',
			});
			await flush();

			expect(files()[0]).toMatchObject({
				url: '/files/document.txt',
				status: { isLoading: false, isUploadError: false },
			});
		});

		it('reports unknown progress when the total is missing', () => {
			const onUploadFile = vi.fn<UploadMock>(() => new Promise(() => {}));
			const { files, store } = createStore({ onUploadFile });

			store.addFiles([textFile()], 'fileInput');
			const [fileId, , options] = onUploadFile.mock.calls[0];
			options.setProgress(fileId, { loaded: 5 });

			expect(files()[0].status?.progress).toBeUndefined();
		});

		it('uses a custom error message when the upload fails', async () => {
			const getErrorMessage = vi.fn(() => 'Сервис временно недоступен');
			const { files, store } = createStore({
				getErrorMessage,
				onUploadFile: () => Promise.reject(new Error('Network error')),
			});

			store.addFiles([textFile()], 'fileInput');
			await flush();

			expect(getErrorMessage).toHaveBeenCalledWith(
				'uploader-0',
				new Error('Network error'),
			);
			expect(files()[0].status).toMatchObject({
				isLoading: false,
				isUploadError: true,
				errorMsg: 'Сервис временно недоступен',
			});
		});

		it('falls back to the default error message', async () => {
			const { files, store } = createStore({
				onUploadFile: () => Promise.reject('boom'),
			});

			store.addFiles([textFile()], 'fileInput');
			await flush();

			expect(files()[0].status?.errorMsg).toBe(UPLOAD_ERROR_MESSAGE);
		});

		it('aborts an upload and ignores its late result', async () => {
			let signal: AbortSignal | undefined;
			const deferred = createDeferred<UploadedFileData>();
			const { files, store } = createStore({
				onUploadFile: (_id, _file, options: FileUploaderUploadOptions) => {
					signal = options.signal;
					return deferred.promise;
				},
			});

			store.addFiles([textFile()], 'fileInput');
			store.abortUpload('uploader-0');

			expect(signal?.aborted).toBe(true);
			expect(files()[0].status).toMatchObject({
				isUploadError: true,
				errorMsg: ABORT_ERROR_MESSAGE,
			});

			deferred.resolve({ id: 'uploader-0', name: 'x', type: 'text/plain' });
			await flush();

			expect(files()[0].status?.errorMsg).toBe(ABORT_ERROR_MESSAGE);
		});

		it('retries a failed upload with the original input source', async () => {
			const onUploadFile = vi
				.fn<UploadMock>()
				.mockRejectedValueOnce(new Error('Network error'))
				.mockImplementationOnce((id, file) =>
					Promise.resolve({ id, name: file.name, type: file.type }),
				);
			const { files, setValue, store } = createStore({ onUploadFile });

			store.addFiles([textFile()], 'dragAndDrop');
			await flush();
			expect(files()[0].status?.isUploadError).toBe(true);

			store.retryUpload('uploader-0');
			expect(files()[0].status?.isLoading).toBe(true);
			await flush();

			expect(onUploadFile).toHaveBeenCalledTimes(2);
			expect(files()[0].status).toMatchObject({
				isLoading: false,
				isUploadError: false,
			});
			expect(setValue).toHaveBeenLastCalledWith(expect.anything(), {
				inputSourceType: 'dragAndDrop',
			});
		});

		it('does not retry files without a local File', () => {
			const onUploadFile = vi.fn<UploadMock>();
			const { store } = createStore({
				onUploadFile,
				value: uploadedFile('file-1', 'a.txt'),
			});

			store.retryUpload('file-1');

			expect(onUploadFile).not.toHaveBeenCalled();
		});

		it('aborts uploads of files removed from the value', () => {
			let signal: AbortSignal | undefined;
			const { state, store } = createStore({
				onUploadFile: (_id, _file, options) => {
					signal = options.signal;
					return new Promise(() => {});
				},
			});

			store.addFiles([textFile()], 'fileInput');
			store.syncControllers();
			expect(signal?.aborted).toBe(false);

			state.value = null;
			store.syncControllers();

			expect(signal?.aborted).toBe(true);
		});

		it('aborts uploads and ignores results after destroy', async () => {
			let signal: AbortSignal | undefined;
			const deferred = createDeferred<UploadedFileData>();
			const { setValue, store } = createStore({
				onUploadFile: (_id, _file, options) => {
					signal = options.signal;
					return deferred.promise;
				},
			});

			store.addFiles([textFile()], 'fileInput');
			const callsBeforeDestroy = setValue.mock.calls.length;
			store.destroy();
			deferred.resolve({ id: 'uploader-0', name: 'x', type: 'text/plain' });
			await flush();

			expect(signal?.aborted).toBe(true);
			expect(setValue).toHaveBeenCalledTimes(callsBeforeDestroy);
		});
	});

	describe('deleting', () => {
		it('removes a file immediately without onDeleteFile', async () => {
			const { files, setValue, store } = createStore({
				isMultiple: true,
				maxFileCount: 2,
				value: [
					uploadedFile('file-1', 'a.txt'),
					uploadedFile('file-2', 'b.txt'),
				],
			});

			await store.deleteFile('file-1');

			expect(files().map(({ id }) => id)).toEqual(['file-2']);
			expect(setValue).toHaveBeenCalledWith(
				[expect.objectContaining({ id: 'file-2' })],
				undefined,
			);
		});

		it('waits for onDeleteFile before removing', async () => {
			const deferred = createDeferred<void>();
			const onDeleteFile = vi.fn(() => deferred.promise);
			const { files, state, store } = createStore({
				onDeleteFile,
				value: uploadedFile('file-1', 'a.txt'),
			});

			const deleting = store.deleteFile('file-1');

			expect(onDeleteFile).toHaveBeenCalledWith('file-1');
			expect(store.deletingFileIds.has('file-1')).toBe(true);
			expect(files()).toHaveLength(1);

			deferred.resolve();
			await deleting;

			expect(state.value).toBeNull();
			expect(store.deletingFileIds.has('file-1')).toBe(false);
		});

		it('keeps the file and notifies when deletion fails', async () => {
			const notify = createNotify();
			const { files, store } = createStore({
				notify,
				onDeleteFile: () => Promise.reject(new Error('Forbidden')),
				value: uploadedFile('file-1', 'a.txt'),
			});

			await store.deleteFile('file-1');

			expect(files()).toHaveLength(1);
			expect(notify.error).toHaveBeenCalledWith(DELETE_ERROR_MESSAGE);
			expect(store.deletingFileIds.size).toBe(0);
		});

		it('aborts an active upload of a deleted file', async () => {
			let signal: AbortSignal | undefined;
			const { files, store } = createStore({
				onUploadFile: (_id, _file, options) => {
					signal = options.signal;
					return new Promise(() => {});
				},
			});

			store.addFiles([textFile()], 'fileInput');
			await store.deleteFile('uploader-0');

			expect(signal?.aborted).toBe(true);
			expect(files()).toHaveLength(0);
		});
	});

	describe('drag and drop', () => {
		it('activates only for dragged files', () => {
			const { store } = createStore();

			store.dragEnter(['text/plain']);
			expect(store.isDragActive).toBe(false);

			store.dragEnter(['Files']);
			expect(store.isDragActive).toBe(true);
		});

		it('stays active while the pointer moves over nested elements', () => {
			const { store } = createStore();

			store.dragEnter(['Files']);
			store.dragEnter(['Files']);
			store.dragLeave();
			expect(store.isDragActive).toBe(true);

			store.dragLeave();
			expect(store.isDragActive).toBe(false);
		});

		it('adds dropped files and resets the drag state', () => {
			const { setValue, store } = createStore();

			store.dragEnter(['Files']);
			store.dragEnter(['Files']);
			store.drop([textFile()]);

			expect(store.isDragActive).toBe(false);
			expect(setValue).toHaveBeenCalledWith(expect.anything(), {
				inputSourceType: 'dragAndDrop',
			});

			store.dragEnter(['Files']);
			store.dragLeave();
			expect(store.isDragActive).toBe(false);
		});

		it('ignores dragging and dropping while disabled', () => {
			const { setValue, store } = createStore({ isDisabled: true });

			store.dragEnter(['Files']);
			store.drop([textFile()]);

			expect(store.isDragActive).toBe(false);
			expect(setValue).not.toHaveBeenCalled();
		});
	});
});
