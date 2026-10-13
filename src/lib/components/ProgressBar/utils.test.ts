import { describe, expect, it } from 'vitest';
import { clampProgress } from './utils';

describe('clampProgress', () => {
	it('keeps values inside the supported range', () => {
		expect(clampProgress(42)).toBe(42);
	});

	it.each([
		[-20, 0],
		[140, 100],
		[Number.NaN, 0],
		[Number.POSITIVE_INFINITY, 0],
	])('clamps %s to %s', (value, expected) => {
		expect(clampProgress(value)).toBe(expected);
	});
});
