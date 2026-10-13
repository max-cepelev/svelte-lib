import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type FileId = string;

export type FileUploaderInputSource = 'fileInput' | 'dragAndDrop';

export type FileUploaderMetaInfo = {
	inputSourceType?: FileUploaderInputSource;
};

export type FileStatus = {
	isLoading?: boolean;
	isUploadError?: boolean;
	isRestrictionError?: boolean;
	errorMsg?: string;
	progress?: number;
};

export type UploadFile = {
	id: FileId;
	name: string;
	type: string;
	size?: number;
	file?: File;
	url?: string;
	status?: FileStatus;
};

export type UploadedFileData = Omit<UploadFile, 'status'>;

export type RestrictionFnResult = {
	code: string;
	message: string;
};

export type RestrictionFn = (value: File) => RestrictionFnResult | undefined;

export type FileUploaderNotifyOptions = {
	content?: string;
};

export type FileUploaderNotify = {
	success: (
		title: string,
		options?: FileUploaderNotifyOptions,
	) => number | string;
	error: (
		title: string,
		options?: FileUploaderNotifyOptions,
	) => number | string;
	warning: (
		title: string,
		options?: FileUploaderNotifyOptions,
	) => number | string;
	info: (title: string, options?: FileUploaderNotifyOptions) => number | string;
};

export type FileUploadProgress = {
	loaded: number;
	total?: number;
};

export type FileUploaderUploadOptions = {
	signal: AbortSignal;
	setProgress: (progressFileId: FileId, progress: FileUploadProgress) => void;
};

export type FileUploaderCallbacks = {
	notify?: FileUploaderNotify;
	generateDownloadLink?: (
		fileId: FileId,
		file?: File,
		fileUrl?: string,
	) => string;
	onUploadFile?: (
		fileId: FileId,
		file: File,
		options: FileUploaderUploadOptions,
	) => Promise<UploadedFileData>;
	onDeleteFile?: (fileId: FileId) => Promise<void>;
	onView?: (fileId: FileId, file?: File, fileUrl?: string) => void;
	getErrorMessage?: (fileId: FileId, error: Error) => string;
};

type BaseFileUploaderProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
	FileUploaderCallbacks & {
		ref?: HTMLDivElement | null;
		inputRef?: HTMLInputElement | null;
		name?: string;
		label?: Snippet | string;
		accept?: string[];
		maxFileSize?: number;
		isDisabled?: boolean;
		isError?: boolean;
		required?: boolean;
		helperText?: Snippet | string;
		restrictions?: RestrictionFn[];
		placeholder?: Snippet | string;
	};

export type SingleFileUploaderProps = BaseFileUploaderProps & {
	value?: UploadFile | null;
	isMultiple?: false;
	maxFileCount?: never;
	onValueChange?: (
		value: UploadFile | null,
		metaInfo?: FileUploaderMetaInfo,
	) => void;
};

export type MultipleFileUploaderProps = BaseFileUploaderProps & {
	value?: UploadFile[];
	isMultiple: true;
	maxFileCount: number;
	onValueChange?: (
		value: UploadFile[],
		metaInfo?: FileUploaderMetaInfo,
	) => void;
};

export type FileUploaderProps =
	| MultipleFileUploaderProps
	| SingleFileUploaderProps;
