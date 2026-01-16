import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin';
import svelte from 'rollup-plugin-svelte';
import { sveltePreprocess } from 'svelte-preprocess';
import { defineConfig } from 'tsdown';
import { svelteDtsPlugin } from './scripts/tsdown-plugin-svelte-dts.js';

export default defineConfig({
	platform: 'browser',
	unbundle: true,
	exports: true,
	entry: {
		components: './src/components/index.ts',
		theme: './src/theme.css.ts',
		utils: './src/utils.ts',
	},
	plugins: [
		svelte({ preprocess: sveltePreprocess() }),
		vanillaExtractPlugin({
			identifiers: ({ debugId, hash }) => `${debugId ?? 'style'}__${hash}`,
		}),
		svelteDtsPlugin({
			declarationDir: './dist',
			libRoot: './src',
			tsconfig: 'tsconfig.json',
		}),
	],
});
