import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin';
import { resolve } from 'node:path';
import { cwd } from 'node:process';
import svelte from 'rollup-plugin-svelte';
import { sveltePreprocess } from 'svelte-preprocess';
import { defineConfig } from 'tsdown';
import { svelteDtsPlugin } from './scripts/tsdown-plugin-svelte-dts.js';

export default defineConfig({
  platform: 'browser',
  plugins: [
    svelte({ preprocess: sveltePreprocess() }),
    vanillaExtractPlugin({
      identifiers: ({ debugId, hash }) => `${debugId ?? 'style'}__${hash}`,
      // extract: {
      //   name: 'styles.css',
      // }
    }),
    svelteDtsPlugin({
      declarationDir: './dist',
      libRoot: './src',
      tsconfig: 'tsconfig.json',
    }),
  ],
  outputOptions: {
    minify: true,
  },
  alias: {
    '~/components': resolve(cwd(), './src/components'),
    '~/styles': resolve(cwd(), './src/styles'),
  },
})
