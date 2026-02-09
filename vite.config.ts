/// <reference types="vitest/config" />

import path from 'node:path';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	root: './src',
	resolve: {
		alias: {
			'~/utils': path.resolve(__dirname, './src/utils.ts'),
		},
	},
	plugins: [
		svelte(),
		vanillaExtractPlugin({
			identifiers: ({ debugId, hash }) => `${debugId ?? 'style'}__${hash}`,
		}),
		tsconfigPaths(),
	],
});
