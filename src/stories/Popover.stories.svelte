<script  module lang="ts">
import { defineMeta } from '@storybook/addon-svelte-csf';
import { Button, Popover, Typography } from '../components/index.js';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const { Story } = defineMeta({
	title: 'Popover',
	component: Popover.Root,
	tags: ['autodocs'],
});
</script>


<Story name="Default" asChild>
<Popover.Root>
  <Popover.Trigger>
		<Button variant='outline'>Open popover</Button>
	</Popover.Trigger>
	<Popover.Content>
		<Typography>Popover content</Typography>
  </Popover.Content>
</Popover.Root>
</Story>

