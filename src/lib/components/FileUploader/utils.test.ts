import { describe, expect, it } from 'vitest';
import {
	canOpenInBrowser,
	compareFile,
	createUploadFile,
	FILE_MAX_SIZE_ERROR,
	FILE_MIME_MISMATCH_ERROR,
	FILE_TYPE_ERROR,
	formatAccept,
	formatFileSize,
	pluralizeFiles,
	restrictFileMaxSize,
	restrictFileType,
	toFileArray,
	validateFile,
} from './utils';

describe('file uploader utilities', () => {
	it('formats sizes and accept values for the UI', () => {
		expect(formatFileSize(0)).toBe('0 Б');
		expect(formatFileSize(512)).toBe('512 Б');
		expect(formatFileSize(5 * 1024)).toBe('5.00 КБ');
		expect(formatFileSize(3 * 1024 ** 3)).toBe('3.00 ГБ');
		expect(formatAccept(['.jpg', 'image/png', 'image/*', '.jpg'])).toBe(
			'JPG, PNG, IMAGE',
		);
	});

	it('supports extensions, exact MIME types and wildcard MIME types', () => {
		const jpeg = new File([], 'photo.JPG', { type: 'image/jpeg' });

		expect(restrictFileType([])(jpeg)).toBeUndefined();
		expect(restrictFileType(['.jpg'])(jpeg)).toBeUndefined();
		expect(restrictFileType(['image/jpeg'])(jpeg)).toBeUndefined();
		expect(restrictFileType(['image/*'])(jpeg)).toBeUndefined();
		expect(restrictFileType(['application/pdf'])(jpeg)?.code).toBe(
			FILE_TYPE_ERROR,
		);
	});

	it('detects a known mismatch between an extension and MIME type', () => {
		const disguisedPdf = new File([], 'document.jpg', {
			type: 'application/pdf',
		});

		expect(restrictFileType(['.jpg'])(disguisedPdf)?.code).toBe(
			FILE_MIME_MISMATCH_ERROR,
		);
	});

	it('checks file size before custom restrictions', () => {
		const file = new File(['12345'], 'large.txt', { type: 'text/plain' });
		const customRestriction = () => ({
			code: 'custom',
			message: 'Custom restriction',
		});

		expect(restrictFileMaxSize(3)(file)?.code).toBe(FILE_MAX_SIZE_ERROR);
		expect(restrictFileMaxSize()(file)).toBeUndefined();
		expect(
			validateFile(file, {
				accept: ['.txt'],
				maxFileSize: 3,
				restrictions: [customRestriction],
			})?.code,
		).toBe(FILE_MAX_SIZE_ERROR);
		expect(
			validateFile(file, {
				accept: ['.txt'],
				restrictions: [customRestriction],
			})?.code,
		).toBe('custom');
	});

	it('compares files by name and size', () => {
		const file = new File(['content'], 'document.txt');

		expect(compareFile(file, { name: 'document.txt', size: file.size })).toBe(
			true,
		);
		expect(compareFile(file, { name: 'other.txt', size: file.size })).toBe(
			false,
		);
	});

	it('creates upload files with a restriction status', () => {
		const file = new File(['content'], 'document.txt', { type: 'text/plain' });

		expect(createUploadFile(file, 'file-1')).toMatchObject({
			id: 'file-1',
			name: 'document.txt',
			type: 'text/plain',
			size: file.size,
			file,
			status: { isRestrictionError: false },
		});
		expect(
			createUploadFile(file, 'file-2', { code: 'custom', message: 'Нельзя' })
				.status,
		).toMatchObject({ isRestrictionError: true, errorMsg: 'Нельзя' });
	});

	it('normalizes single and multiple values to an array', () => {
		const file = { id: 'file-1', name: 'a.txt', type: 'text/plain' };

		expect(toFileArray(null)).toEqual([]);
		expect(toFileArray(undefined)).toEqual([]);
		expect(toFileArray(file)).toEqual([file]);
		expect(toFileArray([file])).toEqual([file]);
	});

	it('detects files that a browser can open', () => {
		expect(
			canOpenInBrowser({ id: '1', name: 'a.png', type: 'image/png' }),
		).toBe(true);
		expect(canOpenInBrowser({ id: '2', name: 'a.pdf', type: '' })).toBe(true);
		expect(
			canOpenInBrowser({ id: '3', name: 'a.zip', type: 'application/zip' }),
		).toBe(false);
	});

	it.each([
		[1, 'файл'],
		[2, 'файла'],
		[5, 'файлов'],
		[11, 'файлов'],
		[21, 'файл'],
		[22, 'файла'],
		[112, 'файлов'],
	])('pluralizes %s as %s', (count, expected) => {
		expect(pluralizeFiles(count)).toBe(expected);
	});
});
