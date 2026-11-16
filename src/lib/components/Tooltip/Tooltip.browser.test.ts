/// <reference types="@vitest/browser-playwright" />

import { describe, expect, it } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';
import TooltipExample from './Tooltip.test.svelte';
import type { TooltipProps } from './types';

const placements = [
	'top',
	'top-start',
	'top-end',
	'bottom',
	'bottom-start',
	'bottom-end',
	'left',
	'left-start',
	'left-end',
	'right',
	'right-start',
	'right-end',
] as const satisfies NonNullable<TooltipProps['placement']>[];

function getPositioner(content: Element) {
	const positioner = content.closest<HTMLElement>(
		'[data-slot="tooltip-positioner"]',
	);
	if (!positioner) throw new Error('Expected a stable tooltip positioner');
	return positioner;
}

async function finishAnimations(content: Element) {
	await Promise.allSettled(
		content.getAnimations().map((animation) => animation.finished),
	);
}

describe('Tooltip', () => {
	it.each(placements)(
		'uses the resolved side and exit animation for placement=%s',
		async (placement) => {
			const screen = await render(TooltipExample, { placement });
			const trigger = screen.getByRole('button', { name: 'Hover target' });
			await trigger.hover();
			const tooltip = page.getByRole('tooltip');
			await expect.element(tooltip).toBeVisible();
			const content = tooltip.element();
			await finishAnimations(content);

			const side = placement.split('-')[0];
			expect(content).toHaveAttribute('data-side', side);
			expect(content).toHaveAttribute('data-placement', placement);
			expect(trigger.element().getAttribute('aria-describedby')).toBe(
				content.id,
			);
			expect(content.classList.contains('consumer-tooltip')).toBe(true);
			const arrow = content.querySelector('[data-slot="tooltip-arrow"]');
			if (!arrow) throw new Error('Expected a tooltip arrow');
			expect(arrow).toHaveAttribute('data-side', side);
			expect(arrow.classList.contains('consumer-arrow')).toBe(true);
			expect(getComputedStyle(arrow).transform).not.toBe('none');

			const positioner = getPositioner(content);
			expect(getComputedStyle(positioner).transform).toBe('none');
			await screen.getByRole('button', { name: 'Outside' }).hover();
			await expect.element(content).toHaveAttribute('data-state', 'closed');
			expect(getComputedStyle(content).animationName).toContain('tooltip-exit');
			await expect.element(content).not.toBeInTheDocument();
		},
	);

	it.each(['right-start', 'right-end', 'left-start'] as const)(
		'keeps the hover area stable when entering the edge for placement=%s',
		async (placement) => {
			const screen = await render(TooltipExample, { placement });
			await screen.getByRole('button', { name: 'Hover target' }).hover();
			const tooltip = page.getByRole('tooltip');
			await expect.element(tooltip).toBeVisible();
			const content = tooltip.element();
			await finishAnimations(content);
			const positioner = getPositioner(content);
			const locator = page.elementLocator(positioner);
			const initial = positioner.getBoundingClientRect();
			const rightSide = positioner.dataset.side === 'right';
			const edge = {
				x: rightSide ? 0.5 : initial.width - 0.5,
				y: initial.height / 2,
			};
			const gap = { x: rightSide ? -5 : initial.width + 5, y: edge.y };
			const states: string[] = [];
			const observer = new MutationObserver(() => {
				states.push(positioner.dataset.state ?? '');
			});
			observer.observe(positioner, {
				attributes: true,
				attributeFilter: ['data-state'],
			});

			try {
				await locator.hover({ position: gap, force: true });
				await expect
					.element(positioner)
					.toHaveAttribute('data-state', 'closed');
				await locator.hover({ position: edge, force: true });
				await expect.element(positioner).toHaveAttribute('data-state', 'open');

				// Repeated native mouse moves used to restart the enter/exit animations.
				for (let i = 0; i < 10; i++) {
					await locator.hover({ position: edge, force: true });
					const rect = positioner.getBoundingClientRect();
					expect(rect.x).toBeCloseTo(initial.x, 1);
					expect(rect.y).toBeCloseTo(initial.y, 1);
					expect(rect.width).toBeCloseTo(initial.width, 1);
					expect(rect.height).toBeCloseTo(initial.height, 1);
					expect(positioner.matches(':hover')).toBe(true);
				}
				expect(states).toEqual(['closed', 'open']);
			} finally {
				observer.disconnect();
			}
		},
	);

	it('updates the side and arrow after flipping near the viewport edge', async () => {
		const screen = await render(TooltipExample, {
			placement: 'right-start',
			nearRightEdge: true,
		});
		await screen.getByRole('button', { name: 'Hover target' }).hover();
		const tooltip = page.getByRole('tooltip');
		await expect
			.element(tooltip)
			.toHaveAttribute('data-placement', 'left-start');
		await expect.element(tooltip).toHaveAttribute('data-side', 'left');
		expect(
			tooltip.element().querySelector('[data-slot="tooltip-arrow"]'),
		).toHaveAttribute('data-side', 'left');
	});

	it('supports focus and Escape without reopening under the stationary cursor', async () => {
		const screen = await render(TooltipExample);
		await screen.getByRole('button', { name: 'Hover target' }).click();
		const tooltip = page.getByRole('tooltip');
		await expect.element(tooltip).toBeVisible();
		await userEvent.keyboard('{Escape}');
		await expect.element(tooltip).not.toBeInTheDocument();
	});

	it('preserves open=false', async () => {
		const screen = await render(TooltipExample, { open: false });
		await screen.getByRole('button', { name: 'Hover target' }).hover();
		await expect.element(page.getByRole('tooltip')).not.toBeInTheDocument();
	});
});
