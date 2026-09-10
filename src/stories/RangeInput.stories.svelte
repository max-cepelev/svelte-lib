<script module lang="ts">
import { defineMeta } from '@storybook/addon-svelte-csf';
import {
  Label,
  RangeInput,
  type RangeInputValue,
  Typography,
} from '../lib/components';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const { Story } = defineMeta({
  title: 'RangeInput',
  component: RangeInput,
  tags: ['autodocs'],
});

let value = $state<RangeInputValue>([1_000_000, 5_000_000]);
let decimalValue = $state<RangeInputValue>([-10.5, 0]);

const handleCommit = (value: RangeInputValue) => {
  console.log('Range changed:', value);
};
</script>

<Story name="Default" asChild>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <Label>Цена</Label>
    <RangeInput
      bind:value
      unit="руб."
      min={1000000}
      max={5000000}
      width={300}
      onValueCommit={handleCommit}
    />
    <Typography>{value.join(" ")}</Typography>
  </div>
</Story>

<Story name="Negative and decimal values" asChild>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <Label>Диапазон</Label>
    <RangeInput
      bind:value={decimalValue}
      min={-100}
      max={100}
      step={0.5}
      width={300}
    />
    <Typography>{decimalValue.join(" ")}</Typography>
  </div>
</Story>
