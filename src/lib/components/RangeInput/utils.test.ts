import { describe, expect, it } from 'vitest';
import {
	formatNumber,
	normalizeRangeValue,
	parseFormattedNumber,
} from './utils';

describe('RangeInput number utilities', () => {
	it('formats integer and decimal values without losing their sign', () => {
		expect(formatNumber(1_000_000)).toBe('1 000 000');
		expect(formatNumber(-1_000.5)).toBe('-1 000.5');
	});

	it('parses grouped, negative and decimal values', () => {
		expect(parseFormattedNumber('1 000 000')).toBe(1_000_000);
		expect(parseFormattedNumber('-10,5')).toBe(-10.5);
		expect(parseFormattedNumber('0')).toBe(0);
	});

	it('rejects empty and partially numeric input', () => {
		expect(parseFormattedNumber('')).toBeNaN();
		expect(parseFormattedNumber('-')).toBeNaN();
		expect(parseFormattedNumber('12px')).toBeNaN();
	});

	it('normalizes order, bounds and missing values', () => {
		expect(normalizeRangeValue([80, 20], 0, 100)).toEqual([20, 80]);
		expect(normalizeRangeValue([-20, 120], 0, 100)).toEqual([0, 100]);
		expect(normalizeRangeValue(undefined, -10, 10)).toEqual([-10, 10]);
		expect(normalizeRangeValue([0, 0], -10, 10)).toEqual([0, 0]);
	});
});
