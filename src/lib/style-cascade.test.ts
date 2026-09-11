import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const componentsDirectory = path.resolve(import.meta.dirname, 'components');

const findSvelteFiles = (directory: string): string[] =>
	readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
		const entryPath = path.join(directory, entry.name);

		if (entry.isDirectory()) return findSvelteFiles(entryPath);
		return entry.name.endsWith('.svelte') ? [entryPath] : [];
	});

describe('component style cascade', () => {
	it.each(findSvelteFiles(componentsDirectory))(
		'keeps component defaults in the library layer: %s',
		(file) => {
			const source = readFileSync(file, 'utf8');
			const styleBlocks = source.match(/<style(?:\s[^>]*)?>/g) ?? [];
			const componentLayers =
				source.match(/@layer max-ts-svelte-components\s*\{/g) ?? [];

			expect(componentLayers).toHaveLength(styleBlocks.length);
		},
	);
});
