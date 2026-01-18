<script  module lang="ts">
import { defineMeta } from '@storybook/addon-svelte-csf';
import { RangeInput } from '../components/index.js';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const { Story } = defineMeta({
	title: 'RangeInput',
	component: RangeInput,
	tags: ['autodocs'],
});

let minValue = $state(1);
let maxValue = $state(10);
</script>


<Story name="Default" asChild>
<div style="display: flex; flex-direction: column; gap: 16px">
			<RangeInput
				label='Цена'
				bind:minValue={minValue}
				bind:maxValue={maxValue}
				unit='руб.'
				size='small'
				min={1}
				max={10}
				width={250}
			/>
			<RangeInput
				label='Цена'
				bind:minValue={minValue}
				bind:maxValue={maxValue}
				unit='руб.'
				size='medium'
				min={1}
				max={10}
				width={250}
			/>
			<RangeInput
				label='Цена'
				bind:minValue={minValue}
				bind:maxValue={maxValue}
				unit='руб.'
				size='large'
				min={1}
				max={10}
				width={250}
			/>
		</div>
</Story>

