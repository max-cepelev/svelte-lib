import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import StyleOverrides from './style-overrides.test.svelte';

describe('consumer class overrides', () => {
	it('take precedence over component defaults', async () => {
		const screen = await render(StyleOverrides);

		const tabs = screen
			.getByText('First')
			.element()
			.closest('[data-slot="tabs"]');
		const button = screen.getByText('Button').element();
		const badge = screen.getByText('Badge').element();
		const card = screen
			.getByText('Card')
			.element()
			.closest('[data-slot="card"]');

		if (!(tabs instanceof HTMLElement) || !(card instanceof HTMLElement)) {
			throw new Error('Expected Tabs and Card roots to be rendered');
		}

		expect(getComputedStyle(tabs).display).toBe('grid');
		expect(getComputedStyle(tabs).gap).toBe('31px');
		expect(getComputedStyle(button).position).toBe('absolute');
		expect(getComputedStyle(button).width).toBe('41px');
		expect(getComputedStyle(badge).backgroundColor).toBe('rgb(1, 2, 3)');
		expect(getComputedStyle(card).display).toBe('grid');
		expect(getComputedStyle(card).padding).toBe('13px');
	});

	it('keeps variants and sizes on link buttons', async () => {
		const screen = await render(StyleOverrides);

		const link = screen.getByText('Link');

		await expect.element(link).toHaveAttribute('data-variant', 'link');
		await expect.element(link).toHaveAttribute('data-size', 'icon');
		expect(getComputedStyle(link.element()).width).toBe('36px');
		expect(getComputedStyle(link.element()).height).toBe('36px');
	});

	it('keeps the separator visible', async () => {
		const screen = await render(StyleOverrides);
		const separator = screen.getByTestId('separator').element();
		const styles = getComputedStyle(separator);

		expect(styles.height).toBe('1px');
		expect(styles.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
	});

	it('truncates a single long chip instead of replacing it with +1', async () => {
		const screen = await render(StyleOverrides);
		const trigger = screen.getByTestId('long-select-trigger').element();

		await expect
			.poll(
				() =>
					trigger.querySelector('[data-slot="select-value-chip"]')?.textContent,
			)
			.toContain('A selected option');

		const chips = trigger.querySelector<HTMLElement>(
			'[data-slot="select-value-chips"]',
		);
		const chip = trigger.querySelector<HTMLElement>(
			'[data-slot="select-value-chip"]',
		);
		const label = chip?.querySelector<HTMLElement>('.label');

		if (!chips || !chip || !label) {
			throw new Error('Expected the selected chip to be rendered');
		}

		const displayedChips = Array.from(
			chips.querySelectorAll<HTMLElement>(
				':scope > [data-slot="select-value-chip"]',
			),
		);

		expect(displayedChips).toHaveLength(1);
		expect(displayedChips[0]?.textContent).not.toContain('+1');
		expect(chip.getBoundingClientRect().width).toBeLessThanOrEqual(
			chips.getBoundingClientRect().width,
		);
		expect(label.scrollWidth).toBeGreaterThan(label.clientWidth);
		expect(getComputedStyle(label).textOverflow).toBe('ellipsis');
	});

	it('clears all values in a multiple Select without opening it', async () => {
		const screen = await render(StyleOverrides);
		const trigger = screen.getByTestId('long-select-trigger').element();
		const clearButton = trigger.querySelector<HTMLButtonElement>(
			'[data-slot="select-value-clear"]',
		);

		if (!clearButton) throw new Error('Expected a clear button to be rendered');

		expect(clearButton.getAttribute('aria-label')).toBe(
			'Clear all selected options',
		);
		clearButton.click();

		await expect
			.poll(
				() =>
					trigger.querySelectorAll(
						'[data-slot="select-value-chip"][data-removable]',
					).length,
			)
			.toBe(0);
		expect(trigger.getAttribute('aria-expanded')).toBe('false');
	});

	it('rotates the Select trigger chevron while open', async () => {
		const screen = await render(StyleOverrides);
		const triggerLocator = screen.getByTestId('long-select-trigger');
		const trigger = triggerLocator.element();
		const chevron = trigger.querySelector<HTMLElement>('.chevron');

		if (!chevron) throw new Error('Expected a trigger chevron to be rendered');

		expect(trigger.getAttribute('data-state')).toBe('closed');
		expect(chevron.getAttribute('data-state')).toBe('closed');
		expect(getComputedStyle(chevron).transform).toBe('none');

		await triggerLocator.click();

		await expect.poll(() => trigger.getAttribute('data-state')).toBe('open');
		expect(chevron.getAttribute('data-state')).toBe('open');
		await expect
			.poll(() => getComputedStyle(chevron).transform)
			.not.toBe('none');
	});
});
