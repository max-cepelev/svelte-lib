<script module>
import { defineMeta } from '@storybook/addon-svelte-csf';
import { Input, Label } from '../index.js';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const { Story } = defineMeta({
	title: 'Input',
	component: Input,
	tags: ['autodocs'],
});
</script>

<Story name="Default" />

<Story name="Email" args={{ type: 'email', placeholder: 'Email' }} />

<Story name="Disabled" args={{ disabled: true }} />

<Story name="File" asChild>
	<div style:display="flex" style:flex-direction="column" style:gap="4px">
		<Label for="picture">Picture</Label>
  	<Input id="picture" type="file" />
	</div>
</Story>