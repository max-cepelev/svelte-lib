import path from 'node:path';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
	preprocess: vitePreprocess(),
	kit: {
		alias: {
			'~/utils': path.resolve('./src/lib/utils.ts'),
			'~/components': path.resolve('./src/lib/components/index.ts'),
			'../../../types.ts': path.resolve('./src/lib/types.ts'),
			'~/theme': path.resolve('./src/lib/theme.ts'),
		},
	},
};
