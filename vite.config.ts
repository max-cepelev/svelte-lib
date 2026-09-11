/// <reference types="vitest/config" />

import path from 'node:path';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

export default defineConfig({
	root: './src',
	cacheDir: './node_modules/.vite',
	resolve: {
		tsconfigPaths: true,
	},
	plugins: [svelte({ configFile: path.resolve('./svelte.config.js') })],
	test: {
		exclude: [...configDefaults.exclude, '**/*.browser.test.ts'],
	},
});
