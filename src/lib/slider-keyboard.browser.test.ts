import { describe, expect, it } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';
import { RangeInput } from './components/RangeInput';
import { Slider } from './components/Slider';
import { SliderInput } from './components/SliderInput';

function getThumbs(container: HTMLElement) {
	return Array.from(
		container.querySelectorAll<HTMLElement>('[data-slot="slider-thumb"]'),
	);
}

async function pressArrowRight(times: number) {
	await userEvent.keyboard('{ArrowRight}'.repeat(times));
}

describe('slider keyboard navigation', () => {
	it('keeps the thumb focused across repeated arrow presses', async () => {
		const { container } = await render(Slider, {
			type: 'single',
			value: 50,
			min: 0,
			max: 100,
		});
		const [thumb] = getThumbs(container);

		thumb.focus();
		await pressArrowRight(3);

		await expect.poll(() => thumb.getAttribute('aria-valuenow')).toBe('53');
		expect(thumb.isConnected).toBe(true);
		expect(document.activeElement).toBe(thumb);
	});

	it('keeps the focused thumb of a multiple slider', async () => {
		const { container } = await render(Slider, {
			type: 'multiple',
			value: [20, 50],
			min: 0,
			max: 100,
		});
		const [first, second] = getThumbs(container);

		second.focus();
		await pressArrowRight(3);

		await expect.poll(() => second.getAttribute('aria-valuenow')).toBe('53');
		expect(first.getAttribute('aria-valuenow')).toBe('20');
		expect(second.isConnected).toBe(true);
		expect(document.activeElement).toBe(second);
	});

	it('moves the SliderInput thumb more than one step', async () => {
		const { container } = await render(SliderInput, {
			value: 50,
			min: 0,
			max: 100,
		});
		const [thumb] = getThumbs(container);

		thumb.focus();
		await pressArrowRight(3);

		await expect.poll(() => thumb.getAttribute('aria-valuenow')).toBe('53');
		expect(document.activeElement).toBe(thumb);
	});

	it('moves the RangeInput thumb more than one step', async () => {
		const { container } = await render(RangeInput, {
			value: [20, 50],
			min: 0,
			max: 100,
		});
		const [, second] = getThumbs(container);

		second.focus();
		await pressArrowRight(3);

		await expect.poll(() => second.getAttribute('aria-valuenow')).toBe('53');
		expect(document.activeElement).toBe(second);
	});
});
