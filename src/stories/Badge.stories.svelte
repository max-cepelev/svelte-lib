<script  module lang="ts">
import { defineMeta } from '@storybook/addon-svelte-csf';
import { Badge } from '../components/index.js';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const { Story } = defineMeta({
	title: 'Badge',
	component: Badge,
	tags: ['autodocs'],
});
</script>


<Story name="Default" asChild>
	<div style="width: 400px; display: flex; gap: 8px; flex-wrap: wrap">
	  <Badge>Badge</Badge>
    <Badge variant="secondary">Secondary</Badge>
    <Badge variant="destructive">Destructive</Badge>
    <Badge variant="outline">Outline</Badge>
</div>
</Story>

