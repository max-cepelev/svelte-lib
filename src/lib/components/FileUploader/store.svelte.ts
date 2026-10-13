import { SvelteSet } from 'svelte/reactivity';
import type {
	FileId,
	FileStatus,
	FileUploaderCallbacks,
	FileUploaderInputSource,
	FileUploaderMetaInfo,
	RestrictionFn,
	UploadFile,
} from './types';
import {
	compareFile,
	createUploadFile,
	formatAccept,
	formatFileSize,
	pluralizeFiles,
	toFileArray,
	validateFile,
} from './utils';

const DEFAULT_FILE_STATUS: FileStatus = {
	isLoading: false,
	isUploadError: false,
	isRestrictionError: false,
};

export const ABORT_ERROR_MESSAGE = 'Загрузка прервана';
export const UPLOAD_ERROR_MESSAGE = 'Ошибка загрузки файла';
export const DELETE_ERROR_MESSAGE = 'Ошибка удаления файла';

type FileUploaderValue = UploadFile | UploadFile[] | null | undefined;

export type FileUploaderStoreOptions = Pick<
	FileUploaderCallbacks,
	'notify' | 'onUploadFile' | 'onDeleteFile' | 'getErrorMessage'
> & {
	/** Prefix for generated file ids. */
	id: string;
	value: FileUploaderValue;
	isMultiple?: boolean;
	maxFileCount?: number;
	accept?: string[];
	maxFileSize?: number;
	restrictions?: RestrictionFn[];
	isDisabled?: boolean;
	/** Receives the next value: an array in multiple mode, a single file or null otherwise. */
	setValue: (
		value: UploadFile | UploadFile[] | null,
		metaInfo?: FileUploaderMetaInfo,
	) => void;
};

function toError(error: unknown) {
	return error instanceof Error ? error : new Error(String(error));
}

function replaceFile(
	files: UploadFile[],
	fileId: FileId,
	update: (file: UploadFile) => UploadFile,
) {
	const fileIndex = files.findIndex(({ id }) => id === fileId);

	if (fileIndex < 0) return files;

	const nextFiles = [...files];
	nextFiles[fileIndex] = update(files[fileIndex]);

	return nextFiles;
}

export class FileUploaderStore {
	isDragActive = $state(false);
	readonly deletingFileIds = new SvelteSet<FileId>();

	readonly #options: FileUploaderStoreOptions;
	readonly #controllers = new Map<FileId, AbortController>();
	readonly #metaInfoByFileId = new Map<FileId, FileUploaderMetaInfo>();
	#nextFileId = 0;
	#dragDepth = 0;
	#isDestroyed = false;

	constructor(options: FileUploaderStoreOptions) {
		this.#options = options;
	}

	get files() {
		return toFileArray(this.#options.value);
	}

	get effectiveMaxFileCount() {
		return this.#options.isMultiple ? (this.#options.maxFileCount ?? 1) : 1;
	}

	get isLimitReached() {
		return this.files.length >= this.effectiveMaxFileCount;
	}

	get constraints() {
		const { isMultiple, maxFileSize, accept = [] } = this.#options;
		const count = this.effectiveMaxFileCount;

		return [
			isMultiple ? `Не более ${count} ${pluralizeFiles(count)}` : undefined,
			maxFileSize ? `До ${formatFileSize(maxFileSize)}` : undefined,
			formatAccept(accept) || undefined,
		]
			.filter(Boolean)
			.join(' · ');
	}

	get defaultPrompt() {
		return this.#options.isMultiple
			? 'Перетащите файлы сюда или выберите на устройстве'
			: 'Перетащите файл сюда или выберите на устройстве';
	}

	get limitNotice() {
		const count = this.effectiveMaxFileCount;

		return `Достигнут лимит в ${count} ${pluralizeFiles(count)}. Чтобы добавить новый, удалите один из текущих.`;
	}

	addFiles = (
		fileList: FileList | File[],
		inputSourceType: FileUploaderInputSource,
	) => {
		const {
			isDisabled,
			isMultiple,
			accept = [],
			maxFileSize,
			restrictions,
		} = this.#options;

		if (isDisabled) return;

		const incomingFiles = Array.from(fileList);
		const currentFiles = this.files;
		const uniqueFiles = incomingFiles.filter((file, index, allFiles) => {
			const alreadyAdded = currentFiles.some((currentFile) =>
				compareFile(file, currentFile),
			);
			const firstDuplicateIndex = allFiles.findIndex((candidate) =>
				compareFile(candidate, file),
			);

			return !alreadyAdded && firstDuplicateIndex === index;
		});
		const availableSlots = Math.max(
			0,
			this.effectiveMaxFileCount - currentFiles.length,
		);
		const selectedFiles = uniqueFiles.slice(0, availableSlots);
		const metaInfo = { inputSourceType } satisfies FileUploaderMetaInfo;
		const newFiles = selectedFiles.map((file) => {
			const error = validateFile(file, { accept, maxFileSize, restrictions });
			const id = `${this.#options.id}-${this.#nextFileId++}`;

			this.#metaInfoByFileId.set(id, metaInfo);

			return createUploadFile(file, id, error);
		});

		if (newFiles.length) {
			this.#emit(
				isMultiple ? [...currentFiles, ...newFiles] : newFiles.slice(0, 1),
				metaInfo,
			);

			for (const file of newFiles) {
				if (!file.status?.isRestrictionError) this.#upload(file, metaInfo);
			}
		}

		if (uniqueFiles.length > selectedFiles.length) {
			this.#options.notify?.warning('Не все файлы добавлены', {
				content: `Можно загрузить не более ${this.effectiveMaxFileCount}`,
			});
		}
	};

	abortUpload = (fileId: FileId) => {
		this.#controllers.get(fileId)?.abort();
		this.#controllers.delete(fileId);

		this.#updateFile(fileId, (currentFile) => ({
			...currentFile,
			status: {
				...DEFAULT_FILE_STATUS,
				isUploadError: true,
				errorMsg: ABORT_ERROR_MESSAGE,
			},
		}));
	};

	retryUpload = (fileId: FileId) => {
		const file = this.files.find(({ id }) => id === fileId);

		if (file?.file) this.#upload(file, this.#metaInfoByFileId.get(fileId));
	};

	deleteFile = async (fileId: FileId) => {
		const { onDeleteFile, notify } = this.#options;

		if (!onDeleteFile) {
			this.#removeFile(fileId);
			return;
		}

		this.deletingFileIds.add(fileId);

		try {
			await onDeleteFile(fileId);
			if (!this.#isDestroyed) this.#removeFile(fileId);
		} catch {
			if (!this.#isDestroyed) notify?.error(DELETE_ERROR_MESSAGE);
		} finally {
			this.deletingFileIds.delete(fileId);
		}
	};

	/** Call on `dragenter` with `event.dataTransfer.types`. */
	dragEnter = (types: readonly string[]) => {
		if (this.#options.isDisabled || !types.includes('Files')) return;

		this.#dragDepth += 1;
		this.isDragActive = true;
	};

	/** Call on `dragleave`. Nested elements fire their own enter/leave pairs, so depth is tracked. */
	dragLeave = () => {
		this.#dragDepth = Math.max(0, this.#dragDepth - 1);
		if (this.#dragDepth === 0) this.isDragActive = false;
	};

	/** Call on `drop` with `event.dataTransfer.files`. */
	drop = (files: FileList | File[]) => {
		this.#dragDepth = 0;
		this.isDragActive = false;
		this.addFiles(files, 'dragAndDrop');
	};

	/** Aborts uploads of files that are no longer part of the value. Call whenever the value changes. */
	syncControllers() {
		const fileIds = new Set(this.files.map(({ id }) => id));

		for (const [fileId, controller] of this.#controllers) {
			if (fileIds.has(fileId)) continue;

			controller.abort();
			this.#controllers.delete(fileId);
			this.#metaInfoByFileId.delete(fileId);
		}
	}

	destroy() {
		this.#isDestroyed = true;

		for (const controller of this.#controllers.values()) {
			controller.abort();
		}
		this.#controllers.clear();
	}

	#emit(files: UploadFile[], metaInfo?: FileUploaderMetaInfo) {
		this.#options.setValue(
			this.#options.isMultiple ? files : (files[0] ?? null),
			metaInfo,
		);
	}

	#updateFile(
		fileId: FileId,
		update: (file: UploadFile) => UploadFile,
		metaInfo = this.#metaInfoByFileId.get(fileId),
	) {
		const currentFiles = this.files;
		const nextFiles = replaceFile(currentFiles, fileId, update);

		if (nextFiles !== currentFiles && !this.#isDestroyed) {
			this.#emit(nextFiles, metaInfo);
		}
	}

	#removeFile(fileId: FileId) {
		this.#controllers.get(fileId)?.abort();
		this.#controllers.delete(fileId);
		this.#metaInfoByFileId.delete(fileId);
		this.#emit(this.files.filter(({ id }) => id !== fileId));
	}

	#upload(fileToUpload: UploadFile, metaInfo?: FileUploaderMetaInfo) {
		const { onUploadFile, getErrorMessage } = this.#options;
		const { id: fileId, file } = fileToUpload;

		if (!onUploadFile || !file) return;

		this.#controllers.get(fileId)?.abort();

		const controller = new AbortController();
		const isStale = () => controller.signal.aborted || this.#isDestroyed;

		this.#controllers.set(fileId, controller);
		if (metaInfo) this.#metaInfoByFileId.set(fileId, metaInfo);

		this.#updateFile(
			fileId,
			(currentFile) => ({
				...currentFile,
				status: { ...DEFAULT_FILE_STATUS, isLoading: true, progress: 0 },
			}),
			metaInfo,
		);

		onUploadFile(fileId, file, {
			signal: controller.signal,
			setProgress: (progressFileId, progress) => {
				if (isStale()) return;

				const progressValue = progress.total
					? Math.round((progress.loaded * 100) / progress.total)
					: undefined;

				this.#updateFile(progressFileId || fileId, (currentFile) => ({
					...currentFile,
					status: {
						...DEFAULT_FILE_STATUS,
						isLoading: true,
						progress: progressValue,
					},
				}));
			},
		})
			.then((uploadedFile) => {
				if (isStale()) return;

				this.#updateFile(fileId, (currentFile) => ({
					...currentFile,
					...uploadedFile,
					status: DEFAULT_FILE_STATUS,
				}));
			})
			.catch((error: unknown) => {
				if (isStale()) return;

				const errorMessage =
					getErrorMessage?.(fileId, toError(error)) ?? UPLOAD_ERROR_MESSAGE;

				this.#updateFile(fileId, (currentFile) => ({
					...currentFile,
					status: {
						...DEFAULT_FILE_STATUS,
						isUploadError: true,
						errorMsg: errorMessage,
					},
				}));
			})
			.finally(() => {
				if (this.#controllers.get(fileId) === controller) {
					this.#controllers.delete(fileId);
				}
			});
	}
}
