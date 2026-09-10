import { describe, expect, it } from 'vitest';
import { formatNumber, parseFormattedNumber } from './utils';

describe('SliderInput number utilities', () => {
	it('formats integer and decimal values without losing their sign', () => {
		expect(formatNumber(1_000_000)).toBe('1 000 000');
		expect(formatNumber(-1_000.5)).toBe('-1 000.5');
	});

	it('parses grouped, negative and decimal values', () => {
		expect(parseFormattedNumber('1 000 000')).toBe(1_000_000);
		expect(parseFormattedNumber('-10,5')).toBe(-10.5);
		expect(parseFormattedNumber('0')).toBe(0);
	});

	it('rejects invalid input', () => {
		expect(parseFormattedNumber('')).toBeNaN();
		expect(parseFormattedNumber('-')).toBeNaN();
		expect(parseFormattedNumber('12px')).toBeNaN();
	});
});
