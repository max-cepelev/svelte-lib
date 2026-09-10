import type { Preview } from '@storybook/sveltekit';
import '../src/lib/theme.css';
import '../src/lib/reset.css';

const preview: Preview = {
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
