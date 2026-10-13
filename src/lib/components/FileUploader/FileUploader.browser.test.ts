import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import FileUploader from './FileUploader.svelte';
import type {
	FileUploaderNotify,
	FileUploaderUploadOptions,
	UploadedFileData,
	UploadFile,
} from './types';

function createDeferred<T>() {
	let resolve!: (value: T) => void;
	const promise = new Promise<T>((promiseResolve) => {
		resolve = promiseResolve;
	});

	return { promise, resolve };
}

const textFile = (name = 'document.txt') =>
	new File(['content'], name, { type: 'text/plain' });

const uploadedFile = (id: string, name: string): UploadFile => ({
	id,
	name,
	size: 1024,
	type: 'text/plain',
	url: `/files/${name}`,
});

function dispatchDrag(target: Element, type: string, files: File[] = []) {
	const dataTransfer = new DataTransfer();
	for (const file of files) dataTransfer.items.add(file);

	target.dispatchEvent(
		new DragEvent(type, { bubbles: true, cancelable: true, dataTransfer }),
	);
}

describe('FileUploader', () => {
	it('renders the label, constraints and helper text', async () => {
		const screen = await render(FileUploader, {
			label: 'Документы',
			accept: ['.pdf', 'image/png'],
			maxFileSize: 5 * 1024,
			helperText: 'Добавьте подписанный документ',
		});

		await expect.element(screen.getByText('Документы')).toBeInTheDocument();
		await expect
			.element(screen.getByText('До 5.00 КБ · PDF, PNG'))
			.toBeInTheDocument();
		await expect
			.element(screen.getByText('Добавьте подписанный документ'))
			.toBeInTheDocument();
		await expect
			.element(screen.getByLabelText('Загрузить'))
			.toHaveAttribute('accept', '.pdf,image/png');
	});

	it('adds a file through the native input and reports its source', async () => {
		const onValueChange = vi.fn();
		const screen = await render(FileUploader, {
			accept: ['.txt'],
			onValueChange,
		});

		await screen.getByLabelText('Загрузить').upload(textFile());

		expect(onValueChange).toHaveBeenCalledWith(
			expect.objectContaining({ name: 'document.txt' }),
			{ inputSourceType: 'fileInput' },
		);
		await expect.element(screen.getByText('document.txt')).toBeInTheDocument();
	});

	it('shows a restriction error without starting an upload', async () => {
		const onUploadFile = vi.fn();
		const screen = await render(FileUploader, {
			accept: ['.png'],
			onUploadFile,
		});

		await screen
			.getByLabelText('Загрузить')
			.upload(new File(['pdf'], 'document.pdf', { type: 'application/pdf' }));

		await expect
			.element(screen.getByText('Тип файла недопустим'))
			.toBeInTheDocument();
		expect(onUploadFile).not.toHaveBeenCalled();
	});

	it('updates progress and applies uploaded file data', async () => {
		const deferred = createDeferred<UploadedFileData>();
		let upload:
			| { fileId: string; options: FileUploaderUploadOptions }
			| undefined;
		const screen = await render(FileUploader, {
			onUploadFile: (
				fileId: string,
				_file: File,
				options: FileUploaderUploadOptions,
			) => {
				upload = { fileId, options };
				return deferred.promise;
			},
		});

		await screen.getByLabelText('Загрузить').upload(textFile());
		await vi.waitFor(() => expect(upload).toBeDefined());

		upload?.options.setProgress(upload.fileId, { loaded: 5, total: 10 });
		await expect
			.element(screen.getByRole('progressbar'))
			.toHaveAttribute('aria-valuenow', '50');

		deferred.resolve({
			id: 'uploaded',
			name: 'document.txt',
			type: 'text/plain',
			url: '/files/document.txt',
		});

		await expect
			.element(screen.getByRole('progressbar'))
			.not.toBeInTheDocument();
		await expect
			.element(screen.getByRole('link', { name: 'Скачать' }))
			.toHaveAttribute('href', '/files/document.txt');
	});

	it('supports aborting an active upload', async () => {
		let signal: AbortSignal | undefined;
		const screen = await render(FileUploader, {
			onUploadFile: (
				_fileId: string,
				_file: File,
				options: FileUploaderUploadOptions,
			) => {
				signal = options.signal;
				return new Promise<UploadedFileData>(() => {});
			},
		});

		await screen.getByLabelText('Загрузить').upload(textFile());
		await screen.getByRole('button', { name: 'Отменить загрузку' }).click();

		expect(signal?.aborted).toBe(true);
		await expect
			.element(screen.getByText('Загрузка прервана'))
			.toBeInTheDocument();
		await expect
			.element(screen.getByRole('button', { name: 'Повторить загрузку' }))
			.toBeInTheDocument();
	});

	it('waits for async deletion before removing a file', async () => {
		const deferred = createDeferred<void>();
		const onDeleteFile = vi.fn(() => deferred.promise);
		const screen = await render(FileUploader, {
			value: uploadedFile('file-1', 'document.txt'),
			onDeleteFile,
		});

		await screen.getByRole('button', { name: 'Удалить' }).click();

		expect(onDeleteFile).toHaveBeenCalledWith('file-1');
		await expect.element(screen.getByText('document.txt')).toBeInTheDocument();

		deferred.resolve();

		await expect
			.element(screen.getByText('document.txt'))
			.not.toBeInTheDocument();
	});

	it('highlights the dropzone while files are dragged over it', async () => {
		const screen = await render(FileUploader, {});
		const dropzone = screen
			.getByRole('group', { name: 'Загрузка файлов' })
			.element();

		dispatchDrag(dropzone, 'dragenter', [textFile()]);
		await expect
			.element(screen.getByText('Отпустите файлы, чтобы добавить'))
			.toBeInTheDocument();
		expect(dropzone).toHaveAttribute('data-active');

		dispatchDrag(dropzone, 'dragleave');
		await expect
			.element(screen.getByText('Отпустите файлы, чтобы добавить'))
			.not.toBeInTheDocument();
	});

	it('adds dropped files and reports the file count limit', async () => {
		const onValueChange = vi.fn();
		const notify: FileUploaderNotify = {
			error: vi.fn(() => 'error'),
			info: vi.fn(() => 'info'),
			success: vi.fn(() => 'success'),
			warning: vi.fn(() => 'warning'),
		};
		const screen = await render(FileUploader, {
			isMultiple: true,
			maxFileCount: 2,
			value: [uploadedFile('file-1', 'first.txt')],
			notify,
			onValueChange,
		});

		dispatchDrag(
			screen.getByRole('group', { name: 'Загрузка файлов' }).element(),
			'drop',
			[textFile('second.txt'), textFile('third.txt')],
		);

		expect(onValueChange).toHaveBeenCalledWith(
			[
				expect.objectContaining({ name: 'first.txt' }),
				expect.objectContaining({ name: 'second.txt' }),
			],
			{ inputSourceType: 'dragAndDrop' },
		);
		expect(notify.warning).toHaveBeenCalledWith('Не все файлы добавлены', {
			content: 'Можно загрузить не более 2',
		});
		await expect
			.element(
				screen.getByText(
					'Достигнут лимит в 2 файла. Чтобы добавить новый, удалите один из текущих.',
				),
			)
			.toBeInTheDocument();
		await expect.element(screen.getByLabelText('Загрузить')).toBeDisabled();
	});
});
