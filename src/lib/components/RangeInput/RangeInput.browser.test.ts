/// <reference types="vite/client" />

import { expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';
import '../../styles.css';
import RangeInput from './RangeInput.svelte';

it('displays the title, range separator and unit in order', async () => {
	const screen = await render(RangeInput, {
		min: 0,
		max: 100,
		value: [20, 80],
		title: 'Площадь',
		unit: 'м²',
	});

	const fields = [
		screen.getByText('Площадь', { exact: true }),
		screen.getByRole('textbox', { name: 'Площадь от' }),
		screen.getByText('–', { exact: true }),
		screen.getByRole('textbox', { name: 'Площадь до' }),
		screen.getByText('м²', { exact: true }),
	];
	const positions = fields.map(
		(field) => field.element().getBoundingClientRect().left,
	);
	expect(new Set(positions).size).toBe(fields.length);
	expect(positions).toEqual(positions.toSorted((a, b) => a - b));
	await expect.element(fields[2]).toHaveAttribute('aria-hidden', 'true');
	await expect
		.element(screen.getByText('от', { exact: true }))
		.not.toBeInTheDocument();
	await expect
		.element(screen.getByText('до', { exact: true }))
		.not.toBeInTheDocument();
});

it('accepts either decimal separator and displays a comma after editing', async () => {
	const onValueCommit = vi.fn();
	const screen = await render(RangeInput, {
		min: 0,
		max: 100,
		step: 0.5,
		value: [20, 80],
		onValueCommit,
	});

	const lower = screen.getByRole('textbox', { name: 'от', exact: true });
	const upper = screen.getByRole('textbox', { name: 'до', exact: true });
	await lower.fill('25,5');
	await userEvent.keyboard('{Enter}');
	await upper.fill('75.5');
	await userEvent.keyboard('{Enter}');

	await expect.element(lower).toHaveValue('25,5');
	await expect.element(upper).toHaveValue('75,5');
	expect(onValueCommit.mock.calls).toEqual([[[25.5, 80]], [[25.5, 75.5]]]);
});

it('keeps the fields and separator in place as the slider changes the number of digits', async () => {
	const screen = await render(RangeInput, {
		min: 0,
		max: 20,
		step: 0.1,
		value: [9.9, 15],
		title: 'Площадь',
		unit: 'м²',
		width: 220,
	});

	const lower = screen.getByRole('textbox', { name: 'Площадь от' });
	const elements = [
		lower.element(),
		screen.getByText('–', { exact: true }).element(),
		screen.getByRole('textbox', { name: 'Площадь до' }).element(),
		screen.getByText('м²', { exact: true }).element(),
	];
	const measure = () =>
		elements.map((element) => {
			const { left, width } = element.getBoundingClientRect();
			return { left, width };
		});
	const initial = measure();

	await expect.element(lower).toHaveValue('9,9');
	await userEvent.tab();
	await userEvent.tab();
	await userEvent.tab();
	await expect.element(screen.getByRole('slider').first()).toHaveFocus();
	await userEvent.keyboard('{ArrowRight}');
	await expect.element(lower).toHaveValue('10');
	expect(measure()).toEqual(initial);

	await userEvent.keyboard('{ArrowRight}');
	await expect.element(lower).toHaveValue('10,1');
	expect(measure()).toEqual(initial);
});
