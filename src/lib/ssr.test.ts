import { render } from 'svelte/server';
import { describe, expect, it } from 'vitest';
import { Button, ToggleGroup } from './components';

describe('package SSR entry point', () => {
	it('can import and render a component without browser globals', () => {
		const result = render(Button, { props: {} });

		expect(result.body).toContain('data-slot="button"');
		expect(result.body).toMatch(/class="[^"]*\bbutton\b[^"]*svelte-/);
	});

	it('renders ToggleGroup selection without measuring browser layout', () => {
		const result = render(ToggleGroup, {
			props: {
				label: 'Period',
				value: 0,
				options: [
					{ value: 0, label: 'Day' },
					{ value: 1, label: 'Week' },
				],
			},
		});

		expect(result.body).toContain('data-slot="toggle-group-indicator"');
		expect(result.body).toContain('aria-checked="true"');
		expect(result.body).toContain('number:0');
	});
});
