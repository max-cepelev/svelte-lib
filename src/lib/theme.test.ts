import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { theme } from './theme';

function collectLeaves(value: Record<string, unknown>, prefix = '') {
	const leaves = new Map<string, string>();

	for (const [key, child] of Object.entries(value)) {
		const path = prefix ? `${prefix}.${key}` : key;
		if (typeof child === 'string') {
			leaves.set(path, child);
		} else if (child && typeof child === 'object') {
			for (const [childPath, childValue] of collectLeaves(
				child as Record<string, unknown>,
				path,
			)) {
				leaves.set(childPath, childValue);
			}
		}
	}

	return leaves;
}

function collectSvelteFiles(directory: URL): URL[] {
	return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
		const url = new URL(
			`${entry.name}${entry.isDirectory() ? '/' : ''}`,
			directory,
		);
		if (entry.isDirectory()) return collectSvelteFiles(url);
		return entry.name.endsWith('.svelte') ? [url] : [];
	});
}

function collectThemeVariables() {
	return new Set(
		[...collectLeaves(theme).values()].map((reference) => {
			const match = /^var\((--[\w-]+)\)$/.exec(reference);
			if (!match) throw new Error(`Invalid theme reference: ${reference}`);
			return match[1];
		}),
	);
}

describe('theme', () => {
	it('keeps exported references and CSS declarations in sync', () => {
		const themeCss = readFileSync(
			fileURLToPath(new URL('./theme.css', import.meta.url)),
			'utf8',
		);
		const declarations = new Set(
			[...themeCss.matchAll(/\s(--[\w-]+)\s*:/g)].map(
				([, property]) => property,
			),
		);

		expect(declarations).toEqual(collectThemeVariables());
	});

	it('only references declared theme variables from components', () => {
		const declared = collectThemeVariables();
		const referenced = new Set<string>();
		const componentVariables = new Set<string>();

		for (const file of collectSvelteFiles(
			new URL('./components/', import.meta.url),
		)) {
			const source = readFileSync(fileURLToPath(file), 'utf8');
			for (const [, property] of source.matchAll(/var\((--[\w-]+)/g)) {
				referenced.add(property);
			}
			for (const [, property] of source.matchAll(/(--[\w-]+)\s*:/g)) {
				componentVariables.add(property);
			}
		}

		expect(
			[...referenced].filter(
				(property) =>
					!declared.has(property) &&
					!componentVariables.has(property) &&
					!property.startsWith('--bits-'),
			),
		).toEqual([]);
	});

	it('preserves the original CSS variable names', () => {
		expect(theme.colors.primary).toBe('var(--colors-primary)');
		expect(theme.colors.background.elementHover).toBe(
			'var(--colors-background-elementHover)',
		);
		expect(theme.fontSize.sm).toBe('var(--fontSize-sm)');
		expect(theme.spacing[4]).toBe('var(--spacing-4)');
		expect(theme.elevation[6]).toBe('var(--elevation-5)');
	});
});
