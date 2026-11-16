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

const overflowOptions = [
	{ value: 'first', label: 'First choice' },
	{ value: 'second', label: 'Second choice' },
	{ value: 'third', label: 'Third choice' },
	{ value: 'fourth', label: 'Fourth choice' },
	{ value: 'fifth', label: 'Fifth choice' },
];

function visibleInside(list: Element, item: Element) {
	const viewport = list.getBoundingClientRect();
	const target = item.getBoundingClientRect();
	const styles = getComputedStyle(list);
	const leftInset = list.hasAttribute('data-overflow-start')
		? Number.parseFloat(styles.scrollPaddingLeft)
		: 0;
	const rightInset = list.hasAttribute('data-overflow-end')
		? Number.parseFloat(styles.scrollPaddingRight)
		: 0;
	return (
		target.left >= viewport.left + leftInset - 1 &&
		target.right <= viewport.right - rightInset + 1
	);
}

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

describe('ToggleGroup overflow', () => {
	it.each(['default', 'group'] as const)(
		'reveals initial and externally selected options in the %s variant',
		async (variant) => {
			const onChange = vi.fn();
			const screen = await render(ToggleGroup, {
				options: overflowOptions,
				value: 'fifth',
				variant,
				label: 'Choices',
				style: 'width: 160px;',
				onChange,
			});
			const list = screen.getByRole('group', { name: 'Choices' }).element();

			await expect.poll(() => list.scrollLeft).toBeGreaterThan(0);
			await expect
				.poll(() =>
					visibleInside(
						list,
						screen.getByRole('radio', { name: 'Fifth choice' }).element(),
					),
				)
				.toBe(true);
			await expect.element(list).toHaveAttribute('data-overflow-start');
			await expect.element(list).not.toHaveAttribute('data-overflow-end');
			expect(getComputedStyle(list).maskImage).not.toBe('none');

			await screen.rerender({ value: 'third' });
			await expect
				.poll(() =>
					visibleInside(
						list,
						screen.getByRole('radio', { name: 'Third choice' }).element(),
					),
				)
				.toBe(true);
			await screen.rerender({ value: 'first' });
			await expect.poll(() => list.scrollLeft).toBe(0);
			await expect.element(list).not.toHaveAttribute('data-overflow-start');
			await expect.element(list).toHaveAttribute('data-overflow-end');
			expect(onChange).not.toHaveBeenCalled();
		},
	);

	it('updates fades after manual scrolling and removes them when everything fits', async () => {
		const screen = await render(ToggleGroup, {
			options: overflowOptions,
			value: 'first',
			label: 'Choices',
			style: 'width: 160px;',
		});
		const list = screen.getByRole('group', { name: 'Choices' }).element();
		await expect.element(list).toHaveAttribute('data-overflow-end');
		await expect.element(list).not.toHaveAttribute('data-overflow-start');

		list.scrollTo({ left: list.scrollWidth, behavior: 'instant' });
		await expect.element(list).toHaveAttribute('data-overflow-start');
		await expect.element(list).not.toHaveAttribute('data-overflow-end');
		await expect
			.element(screen.getByRole('radio', { name: 'First choice' }))
			.toHaveAttribute('aria-checked', 'true');

		await screen.rerender({ style: 'width: 1000px; max-width: none;' });
		await expect.element(list).not.toHaveAttribute('data-overflow-start');
		await expect.element(list).not.toHaveAttribute('data-overflow-end');
		expect(getComputedStyle(list).maskImage).toBe('none');
	});

	it.each([false, true])(
		'respects reduced motion when revealing selections (reduced=%s)',
		async (reduced) => {
			const screen = await render(ToggleGroup, {
				options: overflowOptions,
				value: 'first',
				label: 'Choices',
				style: 'width: 160px;',
			});
			const list = screen.getByRole('group', { name: 'Choices' }).element();
			await expect.element(list).toHaveAttribute('data-overflow-end');

			const originalMatchMedia = window.matchMedia.bind(window);
			const media = vi
				.spyOn(window, 'matchMedia')
				.mockImplementation((query) => {
					const result = originalMatchMedia(query);
					if (query === '(prefers-reduced-motion: reduce)') {
						Object.defineProperty(result, 'matches', { value: reduced });
					}
					return result;
				});
			const scroll = vi.spyOn(list, 'scrollBy');
			try {
				await screen.rerender({ value: 'fifth' });
				await expect.poll(() => scroll.mock.calls.length).toBeGreaterThan(0);
				expect(scroll).toHaveBeenCalledWith(
					expect.objectContaining({ behavior: reduced ? 'instant' : 'smooth' }),
				);
				await expect
					.poll(() =>
						visibleInside(
							list,
							screen.getByRole('radio', { name: 'Fifth choice' }).element(),
						),
					)
					.toBe(true);
			} finally {
				media.mockRestore();
				scroll.mockRestore();
			}
		},
	);

	it.each(['default', 'group'] as const)(
		'reveals newly selected multiple options without jumping on deselection in the %s variant',
		async (variant) => {
			const screen = await render(ToggleGroup, {
				options: overflowOptions,
				multiple: true,
				value: ['first'],
				variant,
				label: 'Choices',
				style: 'width: 160px;',
			});
			const list = screen.getByRole('group', { name: 'Choices' }).element();
			await expect.element(list).toHaveAttribute('data-overflow-end');

			await screen.rerender({ value: ['first', 'fifth'] });
			await expect
				.poll(() =>
					Math.abs(list.scrollLeft - (list.scrollWidth - list.clientWidth)),
				)
				.toBeLessThanOrEqual(1);
			await expect
				.poll(() =>
					visibleInside(
						list,
						screen.getByRole('button', { name: 'Fifth choice' }).element(),
					),
				)
				.toBe(true);
			const offset = list.scrollLeft;

			await screen.rerender({ value: ['first'] });
			await expect
				.element(screen.getByRole('button', { name: 'Fifth choice' }))
				.toHaveAttribute('aria-pressed', 'false');
			await new Promise<void>((resolve) =>
				requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
			);
			expect(Math.abs(list.scrollLeft - offset)).toBeLessThanOrEqual(1);
		},
	);

	it('reveals selections and fades the correct edges in RTL layouts', async () => {
		const screen = await render(ToggleGroup, {
			options: overflowOptions,
			value: 'first',
			label: 'Choices',
			style: 'width: 160px; direction: rtl;',
		});
		const list = screen.getByRole('group', { name: 'Choices' }).element();
		await expect.element(list).toHaveAttribute('data-overflow-start');
		await expect.element(list).not.toHaveAttribute('data-overflow-end');

		await screen.rerender({ value: 'fifth' });
		await expect.poll(() => list.scrollLeft).toBeLessThan(0);
		await expect
			.poll(() =>
				visibleInside(
					list,
					screen.getByRole('radio', { name: 'Fifth choice' }).element(),
				),
			)
			.toBe(true);
		await expect.element(list).not.toHaveAttribute('data-overflow-start');
		await expect.element(list).toHaveAttribute('data-overflow-end');
	});

	it('supports constrained vertical groups', async () => {
		const screen = await render(ToggleGroup, {
			options: overflowOptions,
			value: 'fifth',
			orientation: 'vertical',
			label: 'Choices',
			style: 'max-height: 90px;',
		});
		const list = screen.getByRole('group', { name: 'Choices' }).element();
		await expect.poll(() => list.scrollTop).toBeGreaterThan(0);
		await expect.element(list).toHaveAttribute('data-overflow-start');
		await expect.element(list).not.toHaveAttribute('data-overflow-end');
		const viewport = list.getBoundingClientRect();
		const selected = screen
			.getByRole('radio', { name: 'Fifth choice' })
			.element()
			.getBoundingClientRect();
		expect(selected.top).toBeGreaterThanOrEqual(viewport.top);
		expect(selected.bottom).toBeLessThanOrEqual(viewport.bottom);
	});

	it('keeps the beginning of an oversized option readable', async () => {
		const screen = await render(ToggleGroup, {
			options: [
				{
					value: 'long',
					label: 'A very long option that cannot fit on a narrow screen',
				},
				{ value: 'short', label: 'Short' },
			],
			value: 'long',
			label: 'Choices',
			style: 'width: 120px;',
		});
		const list = screen.getByRole('group', { name: 'Choices' }).element();
		await expect.element(list).toHaveAttribute('data-overflow-end');
		await expect.element(list).not.toHaveAttribute('data-overflow-start');
		expect(list.scrollLeft).toBe(0);
	});
});
