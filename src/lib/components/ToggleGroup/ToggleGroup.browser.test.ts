import { describe, expect, it, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';
import ToggleGroup from './ToggleGroup.svelte';
import ToggleGroupBindings from './ToggleGroup.test.svelte';
import type { ToggleGroupSize } from './types';

const options = [
	{ value: 'day', label: 'Day' },
	{ value: 'week', label: 'Week' },
	{ value: 'month', label: 'Full month' },
];

describe('ToggleGroup', () => {
	it.each([
		{ size: 'small', height: 28 },
		{ size: 'medium', height: 36 },
		{ size: 'large', height: 40 },
		{ size: 'icon', height: 36 },
		{ size: 'iconSmall', height: 28 },
	] satisfies { size: ToggleGroupSize; height: number }[])(
		'uses matching heights for both variants with size=$size',
		async ({ size, height }) => {
			const screen = await render(ToggleGroup, {
				options,
				value: 'day',
				label: 'Period',
				size,
			});
			const list = screen.getByRole('group', { name: 'Period' }).element();

			expect(list.getBoundingClientRect().height).toBe(height);
			await screen.rerender({ variant: 'group' });
			expect(list.getBoundingClientRect().height).toBe(height);
		},
	);

	it('keeps a single selection when the active option is clicked again', async () => {
		const onChange = vi.fn();
		const screen = await render(ToggleGroup, {
			options,
			value: 'week',
			label: 'Period',
			onChange,
		});

		await expect
			.element(screen.getByRole('group', { name: 'Period' }))
			.toBeInTheDocument();
		const week = screen.getByRole('radio', { name: 'Week', exact: true });
		await week.click();
		await expect.element(week).toHaveAttribute('aria-checked', 'true');
		expect(onChange).toHaveBeenLastCalledWith('week');

		await screen.getByRole('radio', { name: 'Day', exact: true }).click();
		expect(onChange).toHaveBeenLastCalledWith('day');
		await expect.element(week).toHaveAttribute('aria-checked', 'false');
	});

	it('distinguishes numeric and string values, including empty strings', async () => {
		const onChange = vi.fn();
		const screen = await render(ToggleGroup, {
			options: [
				{ value: 1, label: 'Number' },
				{ value: '1', label: 'String' },
				{ value: '', label: 'Empty' },
			],
			value: 1,
			onChange,
		});

		await screen.getByRole('radio', { name: 'String', exact: true }).click();
		expect(onChange).toHaveBeenLastCalledWith('1');
		await screen.getByRole('radio', { name: 'Empty', exact: true }).click();
		expect(onChange).toHaveBeenLastCalledWith('');
		await screen.getByRole('radio', { name: 'Number', exact: true }).click();
		expect(onChange).toHaveBeenLastCalledWith(1);
	});

	it('toggles multiple values and preserves selections outside the options', async () => {
		const onChange = vi.fn();
		const screen = await render(ToggleGroup, {
			options,
			multiple: true,
			value: ['day', 'hidden'],
			onChange,
		});
		const day = screen.getByRole('button', { name: 'Day', exact: true });
		const week = screen.getByRole('button', { name: 'Week', exact: true });

		await week.click();
		expect(onChange).toHaveBeenLastCalledWith(['day', 'hidden', 'week']);
		await expect.element(week).toHaveAttribute('aria-pressed', 'true');
		await day.click();
		expect(onChange).toHaveBeenLastCalledWith(['hidden', 'week']);
		await week.click();
		expect(onChange).toHaveBeenLastCalledWith(['hidden']);
	});

	it('supports two-way bindings and external updates', async () => {
		const screen = await render(ToggleGroupBindings);

		await screen.getByRole('radio', { name: 'Day', exact: true }).click();
		await expect
			.element(screen.getByRole('status', { name: 'Selected period' }))
			.toHaveTextContent('day');
		await screen
			.getByRole('button', { name: 'Select month externally' })
			.click();
		await expect
			.element(screen.getByRole('radio', { name: 'Full month' }))
			.toHaveAttribute('aria-checked', 'true');
		await screen.getByRole('button', { name: 'Twenty five' }).click();
		await expect
			.element(screen.getByRole('status', { name: 'Selected numbers' }))
			.toHaveTextContent('10,25');
	});

	it('renders snippets, adornments and a tooltip', async () => {
		const screen = await render(ToggleGroupBindings);

		await expect
			.element(screen.getByTestId('prefix'))
			.toHaveTextContent('Start');
		await expect.element(screen.getByTestId('suffix')).toHaveTextContent('End');
		await screen.getByRole('radio', { name: 'Custom option' }).hover();
		await expect
			.element(page.getByRole('tooltip'))
			.toHaveTextContent('Option details');
	});

	it.each(['default', 'group'] as const)(
		'supports keyboard navigation in the %s variant',
		async (variant) => {
			const onChange = vi.fn();
			const screen = await render(ToggleGroup, {
				options: options.map((option) => ({
					...option,
					disabled: option.value === 'week',
				})),
				value: 'day',
				onChange,
				variant,
			});
			const day = screen.getByRole('radio', { name: 'Day', exact: true });
			const month = screen.getByRole('radio', { name: 'Full month' });

			await expect
				.element(screen.getByRole('radio', { name: 'Week', exact: true }))
				.toBeDisabled();
			await day.click();
			await userEvent.keyboard('{ArrowRight}');
			await expect.element(month).toHaveFocus();
			await userEvent.keyboard('{Enter}');
			expect(onChange).toHaveBeenLastCalledWith('month');
			await userEvent.keyboard(' ');
			await expect.element(month).toHaveAttribute('aria-checked', 'true');
			if (variant === 'group') {
				expect(getComputedStyle(month.element()).outlineStyle).toBe('solid');
			}
		},
	);

	it('disables the entire group', async () => {
		const screen = await render(ToggleGroup, { options, disabled: true });

		for (const option of options) {
			await expect
				.element(screen.getByRole('radio', { name: option.label, exact: true }))
				.toBeDisabled();
		}
	});

	it('moves and resizes the same indicator to match the selected option', async () => {
		const screen = await render(ToggleGroup, {
			options,
			value: 'day',
			label: 'Period',
		});
		const list = screen.getByRole('group', { name: 'Period' }).element();
		const indicator = list.querySelector<HTMLElement>(
			'[data-slot="toggle-group-indicator"]',
		);
		if (!indicator) throw new Error('Expected a sliding indicator');

		const indicatorMatches = (option: Element) => {
			const target = option.getBoundingClientRect();
			const actual = indicator.getBoundingClientRect();
			return (
				Math.abs(actual.left - target.left) < 1 &&
				Math.abs(actual.top - target.top) < 1 &&
				Math.abs(actual.width - target.width) < 1 &&
				Math.abs(actual.height - target.height) < 1
			);
		};

		await expect
			.poll(() =>
				indicatorMatches(screen.getByRole('radio', { name: 'Day' }).element()),
			)
			.toBe(true);
		await expect.element(indicator).toBeVisible();
		await expect.element(list).toHaveAttribute('data-indicator-ready', 'true');
		const transitions: string[] = [];
		indicator.addEventListener('transitionrun', (event) => {
			transitions.push(event.propertyName);
		});
		const initialLeft = indicator.getBoundingClientRect().left;
		const month = screen.getByRole('radio', { name: 'Full month' });
		await month.click();

		await expect.poll(() => indicatorMatches(month.element())).toBe(true);
		expect(indicator.getBoundingClientRect().left).toBeGreaterThan(initialLeft);
		expect(list.querySelector('[data-slot="toggle-group-indicator"]')).toBe(
			indicator,
		);
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			expect(getComputedStyle(indicator).transitionDuration).toBe('0s');
		} else {
			expect(transitions).toContain('transform');
			expect(transitions).toContain('width');
		}

		await screen.rerender({
			options: [
				{ value: 'month', label: 'A much longer month label' },
				...options.slice(0, 2),
			],
			value: 'month',
			size: 'large',
		});
		await expect
			.poll(() =>
				indicatorMatches(
					screen
						.getByRole('radio', { name: 'A much longer month label' })
						.element(),
				),
			)
			.toBe(true);
	});

	it('uses static per-item highlights for multiple selection and the group variant', async () => {
		const screen = await render(ToggleGroup, {
			options,
			multiple: true,
			value: ['day', 'week'],
			label: 'Period',
		});
		const list = screen.getByRole('group', { name: 'Period' }).element();

		expect(
			list.querySelector('[data-slot="toggle-group-indicator"]'),
		).toBeNull();
		expect(list.querySelectorAll('[data-state="on"]')).toHaveLength(2);
		await screen.rerender({ multiple: false, value: 'week', variant: 'group' });
		await expect
			.element(screen.getByRole('radio', { name: 'Week' }))
			.toHaveAttribute('aria-checked', 'true');
		const group = screen.getByRole('group', { name: 'Period' }).element();
		expect(group.getAttribute('data-variant')).toBe('group');
		expect(
			group.querySelector('[data-slot="toggle-group-indicator"]'),
		).toBeNull();
		const active = screen.getByRole('radio', { name: 'Week' }).element();
		const inactive = screen.getByRole('radio', { name: 'Day' }).element();
		expect(getComputedStyle(active).backgroundColor).not.toBe(
			getComputedStyle(inactive).backgroundColor,
		);
		expect(getComputedStyle(inactive).borderTopLeftRadius).toBe('8px');
		expect(getComputedStyle(active).borderTopLeftRadius).toBe('0px');
	});
});
