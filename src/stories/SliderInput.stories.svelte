<script module lang="ts">
import { defineMeta } from '@storybook/addon-svelte-csf';
import { Label, SliderInput } from '../components';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const { Story } = defineMeta({
  title: 'SliderInput',
  component: SliderInput,
  tags: ['autodocs'],
});

let value = $state(50);
let temperature = $state(22);
let volume = $state(75);
let opacity = $state(100);
let price = $state(1500000);

const handleValueChange = (newValue: number) => {
  console.log('Value changed:', newValue);
};
</script>

<Story name="Default" asChild>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <Label>Default Slider Input</Label>
    <SliderInput bind:value min={0} max={100} unit="%" width={250} />
  </div>
</Story>

<Story name="With Controlled Value" asChild>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <Label>Temperature</Label>
    <SliderInput
      bind:value={temperature}
      min={-10}
      max={40}
      unit="°C"
      width={300}
    />
    <div style="margin-top: 8px; font-size: 14px;">
      Current value: {temperature}°C
    </div>
  </div>
</Story>

<Story name="With Callback" asChild>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <Label>Volume Control</Label>
    <SliderInput
      bind:value={volume}
      min={0}
      max={100}
      unit="%"
      width={280}
      onValueChange={handleValueChange}
    />
  </div>
</Story>

<Story name="Sizes" asChild>
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <Label>Small Size</Label>
      <SliderInput
        min={0}
        max={100}
        value={30}
        unit="%"
        size="small"
        width={200}
      />
    </div>

    <div style="display: flex; flex-direction: column; gap: 8px;">
      <Label>Medium Size (default)</Label>
      <SliderInput
        min={0}
        max={100}
        value={50}
        unit="%"
        size="medium"
        width={200}
      />
    </div>

    <div style="display: flex; flex-direction: column; gap: 8px;">
      <Label>Large Size</Label>
      <SliderInput
        min={0}
        max={100}
        value={70}
        unit="%"
        size="large"
        width={200}
      />
    </div>
  </div>
</Story>

<Story name="Different Units" asChild>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <Label>Percentage</Label>
      <SliderInput min={0} max={100} value={80} unit="%" width={250} />
    </div>

    <div style="display: flex; flex-direction: column; gap: 8px;">
      <Label>Pixels</Label>
      <SliderInput min={0} max={1000} value={500} unit="px" width={250} />
    </div>

    <div style="display: flex; flex-direction: column; gap: 8px;">
      <Label>Degrees</Label>
      <SliderInput min={0} max={360} value={180} unit="°" width={250} />
    </div>

    <div style="display: flex; flex-direction: column; gap: 8px;">
      <Label>Currency</Label>
      <SliderInput
        bind:value={price}
        min={1000000}
        max={5000000}
        unit="руб."
        width={250}
      />
    </div>
  </div>
</Story>

<Story name="Different Widths" asChild>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <Label>Width 150px</Label>
      <SliderInput min={0} max={100} value={25} unit="%" width={150} />
    </div>

    <div style="display: flex; flex-direction: column; gap: 8px;">
      <Label>Width 250px</Label>
      <SliderInput min={0} max={100} value={50} unit="%" width={250} />
    </div>

    <div style="display: flex; flex-direction: column; gap: 8px;">
      <Label>Width 400px</Label>
      <SliderInput min={0} max={100} value={75} unit="%" width={400} />
    </div>

    <div style="display: flex; flex-direction: column; gap: 8px;">
      <Label>Width "100%" (string)</Label>
      <SliderInput min={0} max={100} value={90} unit="%" width="100%" />
    </div>
  </div>
</Story>

<Story name="Custom Step" asChild>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <Label>Step 1 (default)</Label>
      <SliderInput min={0} max={100} value={50} unit="%" step={1} width={250} />
    </div>

    <div style="display: flex; flex-direction: column; gap: 8px;">
      <Label>Step 5</Label>
      <SliderInput min={0} max={100} value={50} unit="%" step={5} width={250} />
    </div>

    <div style="display: flex; flex-direction: column; gap: 8px;">
      <Label>Step 10</Label>
      <SliderInput
        min={0}
        max={100}
        value={50}
        unit="%"
        step={10}
        width={250}
      />
    </div>
  </div>
</Story>

<Story name="Large Range" asChild>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <Label>Large Range (0 - 10,000,000) with adaptive step</Label>
    <SliderInput
      min={0}
      max={10000000}
      value={5000000}
      unit="руб."
      width={350}
    />
    <div style="font-size: 12px; color: #666;">
      Note: Adaptive step is automatically calculated for large ranges
    </div>
  </div>
</Story>

<Story name="Active State" asChild>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <Label>Normal State</Label>
      <SliderInput
        min={0}
        max={100}
        value={50}
        unit="%"
        width={250}
        isActive={false}
      />
    </div>

    <div style="display: flex; flex-direction: column; gap: 8px;">
      <Label>Active State</Label>
      <SliderInput
        min={0}
        max={100}
        value={50}
        unit="%"
        width={250}
        isActive={true}
      />
    </div>
  </div>
</Story>

<Story name="Opacity Control" asChild>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <Label>Opacity Slider</Label>
    <SliderInput bind:value={opacity} min={0} max={100} unit="%" width={300} />
    <div
      style="width: 200px; height: 100px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); opacity: {opacity / 100}; border-radius: 8px; transition: opacity 0.2s;"
    ></div>
    <div style="font-size: 14px;">Opacity: {opacity}%</div>
  </div>
</Story>
