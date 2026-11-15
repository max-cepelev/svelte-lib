import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import TabsExample from './Tabs.test.svelte';

const indicatorMatches = (indicator: HTMLElement, tab: Element) => {
	const target = tab.getBoundingClientRect();
	const actual = indicator.getBoundingClientRect();
	return (
		Math.abs(actual.left - target.left) < 1 &&
		Math.abs(actual.top - target.top) < 1 &&
		Math.abs(actual.width - target.width) < 1 &&
		Math.abs(actual.height - target.height) < 1
	);
};

function getIndicator(list: Element) {
	const indicator = list.querySelector<HTMLElement>(
		'[data-slot="tabs-indicator"]',
	);
	if (!indicator) throw new Error('Expected a sliding tab indicator');
	return indicator;
}

describe('Tabs', () => {
	it.each(['default', 'line', 'group'] as const)(
		'keeps the %s list at medium control height without a CSS reset',
		async (variant) => {
			const screen = await render(TabsExample, { variant });
			const list = screen.getByRole('tablist', { name: 'Settings' }).element();
			const account = screen.getByRole('tab', { name: 'Account' }).element();

			expect(list.getBoundingClientRect().height).toBe(36);
			expect(account.getBoundingClientRect().height).toBe(
				variant === 'group' ? 36 : 28,
			);

			await screen.getByRole('tab', { name: 'Password' }).click();
			expect(list.getBoundingClientRect().height).toBe(36);
		},
	);

	it.each([
		['default', 'horizontal'],
		['default', 'vertical'],
		['line', 'horizontal'],
		['line', 'vertical'],
	] as const)(
		'animates the %s indicator in the %s orientation',
		async (variant, orientation) => {
			const screen = await render(TabsExample, { variant, orientation });
			const list = screen.getByRole('tablist', { name: 'Settings' }).element();
			const indicator = getIndicator(list);
			const account = screen.getByRole('tab', { name: 'Account' }).element();
			const transitions: string[] = [];
			indicator.addEventListener('transitionrun', (event) => {
				transitions.push(event.propertyName);
			});

			await expect
				.element(list)
				.toHaveAttribute('data-indicator-ready', 'true');
			await expect.element(indicator).toBeVisible();
			await expect.poll(() => indicatorMatches(indicator, account)).toBe(true);
			expect(transitions).toEqual([]);

			const password = screen.getByRole('tab', { name: 'Password' });
			await password.click();
			await expect.element(password).toHaveAttribute('aria-selected', 'true');
			await expect
				.poll(() => indicatorMatches(indicator, password.element()))
				.toBe(true);
			expect(getIndicator(list)).toBe(indicator);
			if (variant === 'line') {
				const underline = getComputedStyle(indicator, '::after');
				expect(underline.content).toBe('""');
				expect(
					orientation === 'horizontal' ? underline.height : underline.width,
				).toBe('2px');
				expect(getComputedStyle(indicator).boxShadow).toBe('none');
				expect(getComputedStyle(password.element(), '::after').opacity).toBe(
					'0',
				);
			}

			if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
				expect(getComputedStyle(indicator).transitionDuration).toBe('0s');
			} else {
				expect(transitions).toContain('transform');
				if (orientation === 'horizontal') {
					expect(transitions).toContain('width');
				}
			}

			await screen.rerender({
				passwordLabel: 'Password and security preferences',
			});
			await expect
				.poll(() =>
					indicatorMatches(
						indicator,
						screen
							.getByRole('tab', { name: 'Password and security preferences' })
							.element(),
					),
				)
				.toBe(true);

			await screen.rerender({ value: 'account' });
			await expect.element(account).toHaveAttribute('aria-selected', 'true');
			await expect.poll(() => indicatorMatches(indicator, account)).toBe(true);
		},
	);

	it.each(['default', 'line'] as const)(
		'keeps the %s indicator aligned while scrolling the selected tab into view',
		async (variant) => {
			const screen = await render(TabsExample, { variant, width: 100 });
			const list = screen.getByRole('tablist', { name: 'Settings' }).element();
			const indicator = getIndicator(list);
			await expect
				.element(list)
				.toHaveAttribute('data-indicator-ready', 'true');

			const password = screen.getByRole('tab', { name: 'Password' });
			await password.click();

			await expect.poll(() => list.scrollLeft).toBeGreaterThan(0);
			await expect
				.poll(() => indicatorMatches(indicator, password.element()))
				.toBe(true);
		},
	);

	it.each(['default', 'line'] as const)(
		'removes the %s indicator when switching to the group variant',
		async (variant) => {
			const screen = await render(TabsExample, { variant });
			const list = screen.getByRole('tablist', { name: 'Settings' }).element();
			await expect
				.element(list)
				.toHaveAttribute('data-indicator-ready', 'true');

			await screen.rerender({ variant: 'group' });
			expect(list.querySelector('[data-slot="tabs-indicator"]')).toBeNull();
			expect(list.hasAttribute('data-indicator-ready')).toBe(false);
			expect(list.style.getPropertyValue('--tabs-indicator-x')).toBe('');

			await screen.rerender({ variant });
			await expect
				.element(list)
				.toHaveAttribute('data-indicator-ready', 'true');
			await expect.element(getIndicator(list)).toBeVisible();
		},
	);
});
