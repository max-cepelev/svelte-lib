/// <reference types="vitest/config" />

import { svelte } from '@sveltejs/vite-plugin-svelte';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
	root: './src',
	plugins: [
		svelte(),
		vanillaExtractPlugin({
			identifiers: ({ debugId, hash }) => `${debugId ?? 'style'}__${hash}`,
		}),
	],
});
