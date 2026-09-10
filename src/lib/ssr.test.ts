import { render } from 'svelte/server';
import { describe, expect, it } from 'vitest';
import { Button } from './components';

describe('package SSR entry point', () => {
	it('can import and render a component without browser globals', () => {
		const result = render(Button, { props: {} });

		expect(result.body).toContain('data-slot="button"');
		expect(result.body).toMatch(/class="[^"]*\bbutton\b[^"]*svelte-/);
	});
});
