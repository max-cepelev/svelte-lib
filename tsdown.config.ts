import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin';
import svelte from 'rollup-plugin-svelte';
import { sveltePreprocess } from 'svelte-preprocess';
import { defineConfig } from 'tsdown';
import { svelteDtsPlugin } from './scripts/tsdown-plugin-svelte-dts.js';

// const componentEntries = globSync('src/components/*.ts').reduce(
// 	(acc: Record<string, string>, file) => {
// 		const outName = path.relative('src', file).replace(/\.ts$/, '');
// 		acc[outName] = `./${file}`;
// 		return acc;
// 	},
// 	{},
// );

export default defineConfig({
	platform: 'browser',
	unbundle: true,
	outputOptions: {
		assetFileNames: 'assets/[name][extname]',
	},
	entry: {
		'components/index': './src/components/index.ts',
		theme: './src/theme.css.ts',
		utils: './src/utils.ts',
	},
	plugins: [
		svelte({
			preprocess: sveltePreprocess(),
			exclude: ['**/*.svelte.ts'],
		}),
		vanillaExtractPlugin({
			extract: {
				name: 'styles.css',
				sourcemap: false,
			},
		}),
		svelteDtsPlugin({
			declarationDir: './dist',
			libRoot: './src',
			tsconfig: 'tsconfig.json',
		}),
	],
});
