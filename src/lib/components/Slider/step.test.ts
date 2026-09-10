import { describe, expect, it } from 'vitest';
import { getSliderStep, snapSliderValue } from './step';

describe('getSliderStep', () => {
	it('keeps the requested step for small ranges', () => {
		expect(getSliderStep(-100, 100, 0.5)).toBe(0.5);
	});

	it('limits large ranges using a multiple of the requested step', () => {
		expect(getSliderStep(1_000_000, 5_000_000, 1)).toBe(4000);
		expect(getSliderStep(0, 10_000, 3)).toBe(12);
		expect(getSliderStep(0, 300, 0.1)).toBe(0.3);
	});
});

describe('snapSliderValue', () => {
	it('snaps to the same step values used by the slider', () => {
		expect(snapSliderValue(-5.5, -10, 40, 1)).toBe(-6);
		expect(snapSliderValue(-5.49, -10, 40, 1)).toBe(-5);
		expect(snapSliderValue(-5.5, -10, 40, 0.5)).toBe(-5.5);
	});

	it('keeps values inside the available step range', () => {
		expect(snapSliderValue(-20, -10, 10, 3)).toBe(-10);
		expect(snapSliderValue(20, -10, 10, 3)).toBe(8);
	});
});
