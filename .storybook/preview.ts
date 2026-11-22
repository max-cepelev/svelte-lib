import type { Preview } from '@storybook/sveltekit';
import '../src/lib/theme.css';
import '../src/lib/reset.css';

const preview: Preview = {
	globalTypes: {
		colorScheme: {
			description: 'Component theme',
			toolbar: {
				title: 'Theme',
				icon: 'mirror',
				items: [
					{ value: 'light', title: 'Light' },
					{ value: 'dark', title: 'Dark' },
				],
				dynamicTitle: true,
			},
		},
	},
	initialGlobals: { colorScheme: 'light' },
	decorators: [
		(Story, { globals }) => {
			if (typeof document !== 'undefined') {
				document.documentElement.dataset.theme =
					globals.colorScheme === 'dark' ? 'dark' : 'light';
			}
			return Story();
		},
	],
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
