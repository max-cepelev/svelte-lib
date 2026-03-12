<script lang="ts">
import { calculateSize } from '~/utils';

import { Typography } from '../Typography';
import { Slider } from '../Slider';

import styles from './styles.css';
import type { SliderInputProps } from './types';
import { formatNumber, parseFormattedNumber } from './utils';

let {
  min = 0,
  max = 100,
  value = $bindable(),
  width = 180,
  step = 1,
  unit,
  size = 'medium',
  class: className,
  name,
  isActive,
  ref = $bindable(null),
  onValueChange,
  onValueCommit,
  id = 'slider-input',
  ...restProps
}: SliderInputProps = $props();

let timerId: NodeJS.Timeout | undefined;
const calculatedWidth = $derived(calculateSize(width));

// Внутреннее состояние для редактирования
let innerDisplayValue = $derived(formatNumber(value || min));

const adaptiveStep = $derived.by(() => {
  const range = max - min;
  const MAX_STEPS = 1000;
  return Math.max(step, Math.ceil(range / MAX_STEPS));
});

// Применение и коммит значений
function applyValues(newValue: number) {
  const clampedValue = Math.max(min, Math.min(max, newValue));

  // Обновляем bindable пропсы
  value = clampedValue;

  onValueChange?.(clampedValue);
}

function handleInput(e: Event) {
  clearTimeout(timerId);

  timerId = setTimeout(() => {
    const target = e.target as HTMLInputElement;
    let newValue = parseFormattedNumber(target.value.replace(/[^\d\s]/g, ''));

    if (Number.isNaN(newValue)) {
      newValue = min;
    }

    applyValues(newValue);
  }, 700);
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    (e.target as HTMLInputElement).blur();
  }
}

function handleSliderCommit(value: number) {
  onValueCommit?.(value);
}

function handleSliderChange(value: number) {
  onValueChange?.(value);
}
</script>

<div
  class={[styles.container, styles.sizes[size], { [styles.active]: isActive }, className]}
  bind:this={ref}
  style:width={calculatedWidth}
  {...restProps}
>
  <input
    class={styles.input}
    type="text"
    inputmode="numeric"
    value={innerDisplayValue}
    oninput={handleInput}
    onkeydown={handleKeyDown}
    {id}
    {name}
  >

  <Typography class={styles.text} color="muted" variant="caption">
    {unit}
  </Typography>

  <Slider
    {min}
    {max}
    {size}
    step={adaptiveStep}
    class={styles.slider}
    trackClass={styles.track}
    type="single"
    bind:value
    onValueCommit={handleSliderCommit}
    onValueChange={handleSliderChange}
  />
</div>
