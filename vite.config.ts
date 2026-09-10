/// <reference types="vitest/config" />

import path from 'node:path';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
	root: './src',
	cacheDir: './node_modules/.vite',
	resolve: {
		tsconfigPaths: true,
	},
	plugins: [svelte({ configFile: path.resolve('./svelte.config.js') })],
});
