<script module>
import { defineMeta } from '@storybook/addon-svelte-csf';
import { fn } from 'storybook/test';
import { Button } from '../components/Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const { Story } = defineMeta({
	title: 'Button',
	component: Button,
	tags: ['autodocs'],
	args: {
		onclick: fn(),
	},
});
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default">Default</Story>

<Story name="Ghost" args={{ variant: 'ghost' }}>Secondary</Story>

<Story name="Large" args={{ size: 'large' }}>Large</Story>

<Story name="Small" args={{ size: 'small' }}>Small</Story>

