import path from 'node:path';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
	preprocess: vitePreprocess(),
	kit: {
		alias: {
			'~/utils': path.resolve('./src/utils.ts'),
			'~/components': path.resolve('./src/components/index.ts'),
			'../../../types.ts': path.resolve('./src/types.ts'),
			'~/theme': path.resolve('./src/theme.css.ts'),
		},
	},
};
