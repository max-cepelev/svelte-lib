<script module lang="ts">
import { defineMeta } from '@storybook/addon-svelte-csf';
import { Label, RangeInput } from '../components';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const { Story } = defineMeta({
  title: 'RangeInput',
  component: RangeInput,
  tags: ['autodocs'],
});

let price = $state<{ min?: number; max?: number }>({});
const handleChange = (value: number[]) => {
  console.log(value);
  price.min = value[0];
  price.max = value[1];
};
</script>

<Story name="Default" asChild>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <Label>Цена</Label>
    <RangeInput
      minValue={price.min}
      maxValue={price.max}
      unit="руб."
      min={3000000}
      max={5000000}
      width={300}
      onValueChange={handleChange}
    />
  </div>
</Story>
