import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { UploadFile } from '../types';
import {
	FAKE_PROGRESS_INTERVAL,
	FAKE_PROGRESS_MAX,
	FileItemStore,
	type FileItemStoreOptions,
} from './store.svelte';

const localFile = new File(['content'], 'photo.png', { type: 'image/png' });

const createFile = (overrides: Partial<UploadFile> = {}): UploadFile => ({
	id: 'file-1',
	name: 'photo.png',
	type: 'image/png',
	size: localFile.size,
	...overrides,
});

function createStore(
	file: UploadFile,
	options: Omit<FileItemStoreOptions, 'file'> = {},
) {
	const state = { file };
	const store = new FileItemStore({
		...options,
		get file() {
			return state.file;
		},
	});

	return { state, store };
}

describe('FileItemStore', () => {
	describe('status', () => {
		it('is ready by default', () => {
			const { store } = createStore(createFile({ url: '/photo.png' }));

			expect(store.state).toBe('ready');
			expect(store.isError).toBe(false);
			expect(store.errorMsg).toBeUndefined();
		});

		it('reports loading', () => {
			const { store } = createStore(
				createFile({ status: { isLoading: true, progress: 30 } }),
			);

			expect(store.state).toBe('loading');
			expect(store.displayedProgress).toBe(30);
		});

		it.each([
			['upload', { isUploadError: true, errorMsg: 'Сеть' }],
			['restriction', { isRestrictionError: true, errorMsg: 'Тип' }],
		])('reports %s errors', (_, status) => {
			const { store } = createStore(createFile({ status }));

			expect(store.state).toBe('error');
			expect(store.errorMsg).toBe(status.errorMsg);
		});
	});

	describe('simulated progress', () => {
		beforeEach(() => {
			vi.useFakeTimers();
		});

		afterEach(() => {
			vi.useRealTimers();
		});

		it('is needed only while loading without real progress', () => {
			expect(
				createStore(createFile({ status: { isLoading: true } })).store
					.shouldSimulateProgress,
			).toBe(true);
			expect(
				createStore(createFile({ status: { isLoading: true, progress: 0 } }))
					.store.shouldSimulateProgress,
			).toBe(false);
			expect(createStore(createFile()).store.shouldSimulateProgress).toBe(
				false,
			);
		});

		it('grows up to the cap and resets on cleanup', () => {
			const { store } = createStore(
				createFile({ status: { isLoading: true } }),
			);
			const stop = store.simulateProgress();

			vi.advanceTimersByTime(FAKE_PROGRESS_INTERVAL * 2);
			expect(store.displayedProgress).toBe(20);

			vi.advanceTimersByTime(FAKE_PROGRESS_INTERVAL * 20);
			expect(store.displayedProgress).toBe(FAKE_PROGRESS_MAX);

			stop();
			expect(store.fakeProgress).toBe(0);
			vi.advanceTimersByTime(FAKE_PROGRESS_INTERVAL * 2);
			expect(store.fakeProgress).toBe(0);
		});

		it('prefers real progress over the simulated one', () => {
			const { state, store } = createStore(
				createFile({ status: { isLoading: true } }),
			);
			store.simulateProgress();
			vi.advanceTimersByTime(FAKE_PROGRESS_INTERVAL * 3);

			state.file = createFile({ status: { isLoading: true, progress: 5 } });

			expect(store.displayedProgress).toBe(5);
		});
	});

	describe('links', () => {
		beforeEach(() => {
			vi.stubGlobal('URL', {
				...URL,
				createObjectURL: vi.fn(() => 'blob:photo'),
				revokeObjectURL: vi.fn(),
			});
		});

		afterEach(() => {
			vi.unstubAllGlobals();
		});

		it('prefers the generated link, then the file url', () => {
			const generateDownloadLink = vi.fn(() => '/generated/photo.png');
			const file = createFile({ url: '/photo.png', file: localFile });

			expect(
				createStore(file, { generateDownloadLink }).store.downloadLink,
			).toBe('/generated/photo.png');
			expect(generateDownloadLink).toHaveBeenCalledWith(
				'file-1',
				localFile,
				'/photo.png',
			);
			expect(createStore(file).store.downloadLink).toBe('/photo.png');
		});

		it('needs an object URL only for local files without links', () => {
			expect(createStore(createFile({ file: localFile })).store.localFile).toBe(
				localFile,
			);
			expect(
				createStore(createFile({ file: localFile, url: '/photo.png' })).store
					.localFile,
			).toBeUndefined();
		});

		it('creates and revokes an object URL', () => {
			const { store } = createStore(createFile({ file: localFile }));
			const revoke = store.createLocalUrl(localFile);

			expect(URL.createObjectURL).toHaveBeenCalledWith(localFile);
			expect(store.downloadLink).toBe('blob:photo');

			revoke?.();

			expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:photo');
			expect(store.downloadLink).toBeUndefined();
		});

		it('skips object URLs where the API is missing', () => {
			vi.stubGlobal('URL', {});
			const { store } = createStore(createFile({ file: localFile }));

			expect(store.createLocalUrl(localFile)).toBeUndefined();
			expect(store.localUrl).toBeUndefined();
		});
	});

	describe('actions', () => {
		it('offers abort only while loading', () => {
			const { store } = createStore(
				createFile({ file: localFile, status: { isLoading: true } }),
			);

			expect(store.canAbort).toBe(true);
			expect(store.canRetry).toBe(false);
			expect(store.canDownload).toBe(false);
			expect(store.canDelete).toBe(false);
		});

		it('offers retry for upload errors of local files', () => {
			const status = { isUploadError: true, errorMsg: 'Сеть' };

			expect(
				createStore(createFile({ file: localFile, status })).store.canRetry,
			).toBe(true);
			expect(createStore(createFile({ status })).store.canRetry).toBe(false);
			expect(
				createStore(
					createFile({
						file: localFile,
						status: { isRestrictionError: true },
					}),
				).store.canRetry,
			).toBe(false);
		});

		it('views through the callback when it is provided', () => {
			const onView = vi.fn();
			const file = createFile({ file: localFile, url: '/photo.png' });
			const { store } = createStore(file, { onView });

			expect(store.canViewWithCallback).toBe(true);
			expect(store.canViewWithLink).toBe(false);

			store.view();

			expect(onView).toHaveBeenCalledWith('file-1', localFile, '/photo.png');
		});

		it('views by link only for files a browser can open', () => {
			expect(
				createStore(createFile({ url: '/photo.png' })).store.canViewWithLink,
			).toBe(true);
			expect(
				createStore(
					createFile({
						name: 'archive.zip',
						type: 'application/zip',
						url: '/archive.zip',
					}),
				).store.canViewWithLink,
			).toBe(false);
		});

		it('downloads and deletes ready files', () => {
			const { store } = createStore(createFile({ url: '/photo.png' }));

			expect(store.canDownload).toBe(true);
			expect(store.canDelete).toBe(true);
		});

		it('hides view and download for failed files', () => {
			const { store } = createStore(
				createFile({
					url: '/photo.png',
					status: { isRestrictionError: true, errorMsg: 'Тип' },
				}),
				{ onView: vi.fn() },
			);

			expect(store.canViewWithCallback).toBe(false);
			expect(store.canViewWithLink).toBe(false);
			expect(store.canDownload).toBe(false);
			expect(store.canDelete).toBe(true);
		});
	});
});
