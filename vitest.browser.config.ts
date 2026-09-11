/// <reference types="vitest/config" />

import path from 'node:path';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	root: './src',
	cacheDir: './node_modules/.vite-browser',
	resolve: {
		tsconfigPaths: true,
	},
	plugins: [svelte({ configFile: path.resolve('./svelte.config.js') })],
	test: {
		include: ['**/*.browser.test.ts'],
		setupFiles: ['vitest-browser-svelte'],
		browser: {
			enabled: true,
			provider: playwright({
				launchOptions: process.env.SVELTE_LIB_BROWSER_EXECUTABLE
					? { executablePath: process.env.SVELTE_LIB_BROWSER_EXECUTABLE }
					: { channel: 'chrome' },
			}),
			instances: [{ browser: 'chromium' }],
		},
	},
});
