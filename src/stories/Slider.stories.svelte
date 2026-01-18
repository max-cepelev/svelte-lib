<script  module lang="ts">
import { defineMeta } from '@storybook/addon-svelte-csf';
import { Slider } from '../components/index.js';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const { Story } = defineMeta({
	title: 'Slider',
	component: Slider,
	tags: ['autodocs'],
});

let value = $state(50);
</script>


<Story name="Default" asChild>
	<Slider type="single" bind:value max={100} step={1} style="max-width: 70%" />
</Story>

