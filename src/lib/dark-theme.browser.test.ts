import { afterEach, describe, expect, it } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';
import DarkTheme from './dark-theme.test.svelte';

const root = document.documentElement;

function contrastRatio(element: Element) {
	const { color, backgroundColor } = getComputedStyle(element);
	const canvas = document.createElement('canvas');
	canvas.width = 2;
	canvas.height = 1;
	const context = canvas.getContext('2d');
	if (!context) throw new Error('Expected a 2D canvas context');

	context.fillStyle = color;
	context.fillRect(0, 0, 1, 1);
	context.fillStyle = backgroundColor;
	context.fillRect(1, 0, 1, 1);
	const pixels = context.getImageData(0, 0, 2, 1).data;
	const [foreground, background] = [0, 4].map((offset) => {
		const [red, green, blue] = Array.from(
			pixels.slice(offset, offset + 3),
			(value) => {
				const channel = value / 255;
				return channel <= 0.04045
					? channel / 12.92
					: ((channel + 0.055) / 1.055) ** 2.4;
			},
		);
		return red * 0.2126 + green * 0.7152 + blue * 0.0722;
	});

	return (
		(Math.max(foreground, background) + 0.05) /
		(Math.min(foreground, background) + 0.05)
	);
}

afterEach(() => {
	delete root.dataset.theme;
});

describe('dark theme', () => {
	it('switches the page and open portals with the root theme', async () => {
		const screen = await render(DarkTheme);
		await screen.getByRole('button', { name: 'Tooltip trigger' }).hover();
		const tooltip = page.getByRole('tooltip');
		await expect.element(tooltip).toBeVisible();
		const tooltipElement = tooltip.element();
		const lightBackground = getComputedStyle(document.body).backgroundColor;
		const lightTooltip = getComputedStyle(tooltipElement).backgroundColor;

		root.dataset.theme = 'dark';
		const darkBackground = getComputedStyle(document.body).backgroundColor;
		expect(getComputedStyle(root).colorScheme).toBe('dark');
		expect(darkBackground).not.toBe(lightBackground);
		expect(getComputedStyle(tooltipElement).backgroundColor).not.toBe(
			lightTooltip,
		);
		expect(contrastRatio(tooltipElement)).toBeGreaterThanOrEqual(4.5);

		await screen.getByRole('button', { name: 'Open dialog' }).click();
		const dialog = page.getByRole('dialog');
		await expect.element(dialog).toBeVisible();
		expect(getComputedStyle(dialog.element()).backgroundColor).toBe(
			darkBackground,
		);

		delete root.dataset.theme;
		expect(getComputedStyle(dialog.element()).backgroundColor).toBe(
			lightBackground,
		);
	});

	it('keeps dark buttons readable and shows focus and invalid states', async () => {
		root.dataset.theme = 'dark';
		const screen = await render(DarkTheme);
		const primary = screen.getByRole('button', { name: 'Default' }).element();
		const destructive = screen
			.getByRole('button', { name: 'Destructive' })
			.element();
		const input = screen.getByRole('textbox', { name: 'Invalid input' });

		expect(contrastRatio(primary)).toBeGreaterThanOrEqual(4.5);
		expect(contrastRatio(destructive)).toBeGreaterThanOrEqual(4.5);
		await userEvent.tab();
		await expect.element(primary).toHaveFocus();
		expect(getComputedStyle(primary).outlineWidth).toBe('2px');
		expect(getComputedStyle(primary).outlineColor).not.toBe('rgba(0, 0, 0, 0)');
		await input.hover();
		expect(getComputedStyle(input.element()).borderTopColor).toBe(
			getComputedStyle(destructive).backgroundColor,
		);
		expect(getComputedStyle(input.element()).boxShadow).not.toBe('none');
	});

	it('updates an existing toast when the root theme changes', async () => {
		const screen = await render(DarkTheme);
		await screen.getByRole('button', { name: 'Destructive' }).click();
		const toast = page.getByText('An error occurred');
		await expect.element(toast).toBeVisible();
		const toaster = toast
			.element()
			.closest<HTMLElement>('[data-sonner-toaster]');
		expect(toaster).toHaveAttribute('data-sonner-theme', 'light');

		root.dataset.theme = 'dark';
		await expect.element(toaster).toHaveAttribute('data-sonner-theme', 'dark');
	});

	it('honors an explicit notification theme', async () => {
		root.dataset.theme = 'dark';
		const screen = await render(DarkTheme, { notificationTheme: 'light' });
		await screen.getByRole('button', { name: 'Destructive' }).click();
		const toast = page.getByText('An error occurred');
		await expect.element(toast).toBeVisible();
		expect(toast.element().closest('[data-sonner-toaster]')).toHaveAttribute(
			'data-sonner-theme',
			'light',
		);
	});
});
