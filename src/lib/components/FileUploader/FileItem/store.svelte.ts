import type { FileUploaderCallbacks, UploadFile } from '../types';
import { canOpenInBrowser } from '../utils';

export const FAKE_PROGRESS_INTERVAL = 500;
export const FAKE_PROGRESS_STEP = 10;
export const FAKE_PROGRESS_MAX = 80;

export type FileItemState = 'loading' | 'error' | 'ready';

export type FileItemStoreOptions = Pick<
	FileUploaderCallbacks,
	'generateDownloadLink' | 'onView'
> & {
	file: UploadFile;
};

export class FileItemStore {
	/** Simulated progress for uploads that don't report their own. */
	fakeProgress = $state(0);
	/** Object URL of a local file that has no server URL yet. */
	localUrl = $state<string>();

	readonly #options: FileItemStoreOptions;

	#generatedDownloadLink = $derived.by(() => {
		const { file, generateDownloadLink } = this.#options;

		return generateDownloadLink?.(file.id, file.file, file.url);
	});

	constructor(options: FileItemStoreOptions) {
		this.#options = options;
	}

	get #status() {
		return this.#options.file.status ?? {};
	}

	get isLoading() {
		return this.#status.isLoading ?? false;
	}

	get isUploadError() {
		return this.#status.isUploadError ?? false;
	}

	get isError() {
		return this.isUploadError || (this.#status.isRestrictionError ?? false);
	}

	get errorMsg() {
		return this.isError ? this.#status.errorMsg : undefined;
	}

	get state(): FileItemState {
		if (this.isLoading) return 'loading';
		if (this.isError) return 'error';

		return 'ready';
	}

	get shouldSimulateProgress() {
		return this.isLoading && typeof this.#status.progress !== 'number';
	}

	get displayedProgress() {
		const { progress } = this.#status;

		return typeof progress === 'number' ? progress : this.fakeProgress;
	}

	/** A local file that needs an object URL to be viewed or downloaded. */
	get localFile() {
		const { file } = this.#options;

		return this.#generatedDownloadLink || file.url ? undefined : file.file;
	}

	get downloadLink() {
		return (
			this.#generatedDownloadLink || this.#options.file.url || this.localUrl
		);
	}

	get isViewable() {
		return Boolean(
			this.#options.onView ||
				(this.downloadLink && canOpenInBrowser(this.#options.file)),
		);
	}

	get canAbort() {
		return this.isLoading;
	}

	get canRetry() {
		return (
			!this.isLoading && this.isUploadError && Boolean(this.#options.file.file)
		);
	}

	get #isReady() {
		return !this.isLoading && !this.isError;
	}

	/** View through the `onView` callback. */
	get canViewWithCallback() {
		return this.#isReady && this.isViewable && Boolean(this.#options.onView);
	}

	/** View by opening the download link in a new tab. */
	get canViewWithLink() {
		return (
			this.#isReady &&
			this.isViewable &&
			!this.#options.onView &&
			Boolean(this.downloadLink)
		);
	}

	get canDownload() {
		return this.#isReady && Boolean(this.downloadLink);
	}

	get canDelete() {
		return !this.isLoading;
	}

	view = () => {
		const { file, onView } = this.#options;

		onView?.(file.id, file.file, file.url);
	};

	/** Runs while `shouldSimulateProgress` is true; returns a cleanup. */
	simulateProgress() {
		this.fakeProgress = 0;

		const interval = setInterval(() => {
			this.fakeProgress = Math.min(
				FAKE_PROGRESS_MAX,
				this.fakeProgress + FAKE_PROGRESS_STEP,
			);
		}, FAKE_PROGRESS_INTERVAL);

		return () => {
			clearInterval(interval);
			this.fakeProgress = 0;
		};
	}

	/** Creates an object URL for `localFile`; returns a cleanup that revokes it. */
	createLocalUrl(file: File) {
		if (typeof URL.createObjectURL !== 'function') return;

		const url = URL.createObjectURL(file);
		this.localUrl = url;

		return () => {
			URL.revokeObjectURL(url);
			if (this.localUrl === url) this.localUrl = undefined;
		};
	}
}
