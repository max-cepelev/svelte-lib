<script lang="ts">
import { calculateSize } from '~/utils';
import { Slider } from '../Slider';
import { Typography } from '../Typography';
import styles from './styles.css';
import type { RangeInputProps } from './types';

let {
  min,
  max,
  minValue = $bindable(),
  maxValue = $bindable(),
  width = 150,
  label,
  unit,
  size = 'medium',
  class: className,
  isActive,
  minInputRef = $bindable(null),
  maxInputRef = $bindable(null),
  ref = $bindable(null),
  ...restProps
}: RangeInputProps = $props();

const containerClass = $derived([
  styles.container,
  styles.sizes[size],
  { [styles.activeClass]: isActive },
  className,
]);

const calculatedWidth = $derived(calculateSize(width));

// Инициализация значений, если они не переданы
$effect.pre(() => {
  if (minValue === undefined) minValue = min;
  if (maxValue === undefined) maxValue = max;
});

function onValueChange(newValue: number[]) {
  if (newValue[0] !== newValue[1]) {
    minValue = newValue[0];
    maxValue = newValue[1];
  }
}

function handleInput(type: 'min' | 'max', event: Event) {
  const target = event.target as HTMLInputElement;
  const val = target.value;
  if (val === '') return;

  const num = Number.parseFloat(val);
  if (!Number.isNaN(num)) {
    if (type === 'min') minValue = num;
    else maxValue = num;
  }
}

function onKeyDown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    // Валидация при нажатии Enter
    if (minValue && minValue < min) minValue = min;
    if (maxValue && maxValue > max) maxValue = max;
    if (minValue && maxValue && minValue > maxValue) {
      const temp = minValue;
      minValue = maxValue;
      maxValue = temp;
    }
  }
}
</script>

<div
  class={containerClass}
  bind:this={ref}
  style:width={calculatedWidth}
  {...restProps}
>
  <Typography class={styles.textClass} color="disabled" variant="body2">
    {label}
  </Typography>
  <Typography class={styles.textClass} color="disabled" variant="body2">
    от
  </Typography>
  <input
    bind:this={minInputRef}
    class={styles.inputClass}
    type="text"
    bind:value={minValue}
    oninput={(e) => handleInput('min', e)}
    onkeydown={onKeyDown}
  >
  <Typography class={styles.textClass} color="disabled" variant="body2">
    до
  </Typography>
  <input
    bind:this={maxInputRef}
    class={styles.inputClass}
    type="text"
    bind:value={maxValue}
    oninput={(e) => handleInput('max', e)}
    onkeydown={onKeyDown}
  >
  <Typography class={styles.textClass} color="disabled" variant="body2">
    {unit}
  </Typography>
  <Slider
    {min}
    {max}
    {size}
    class={styles.sliderClass}
    type="multiple"
    value={[minValue ?? min, maxValue ?? max]}
    onValueChange={onValueChange}
  />
</div>
