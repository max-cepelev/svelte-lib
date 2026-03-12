<script lang="ts">
import { calculateSize } from '~/utils';

import * as styles from './styles.css';
import type { RangeInputProps } from './types';
import { formatNumber, parseFormattedNumber } from './utils';
import { Typography } from '../Typography';
import { Slider } from '../Slider';

let {
  min = 0,
  max = 100,
  value = $bindable(),
  width = 180,
  step = 1,
  unit,
  size = 'medium',
  class: className,
  isActive,
  ref = $bindable(null),
  onValueChange,
  onValueCommit,
  minInputId = 'range-input-min',
  maxInputId = 'range-input-max',
  ...restProps
}: RangeInputProps = $props();

let timerId: NodeJS.Timeout | undefined;
const calculatedWidth = $derived(calculateSize(width));

let innerMin = $derived(formatNumber(value?.[0] || min));
let innerMax = $derived(formatNumber(value?.[1] || max));

const adaptiveStep = $derived.by(() => {
  const range = max - min;
  const MAX_STEPS = 1000;
  return Math.max(step, Math.ceil(range / MAX_STEPS));
});

// Применение и коммит значений
function applyValues([newMin, newMax]: number[]) {
  const clampedMin = Math.max(min, Math.min(newMin, newMax));
  const clampedMax = Math.min(max, Math.max(newMax, newMin));

  const newValue = [clampedMin, clampedMax];

  // Обновляем bindable пропсы
  value = newValue;

  onValueChange?.(newValue);
}

// Обработчики инпутов
function handleInput(e: Event) {
  clearTimeout(timerId);

  timerId = setTimeout(() => {
    const target = e.target as HTMLInputElement;
    let newValue = parseFormattedNumber(target.value.replace(/[^\d\s]/g, ''));

    if (Number.isNaN(value)) {
      newValue = target.name === 'min' ? min : max;
    }

    if (target.name === 'min') {
      applyValues([newValue, value?.[1] || max]);
    } else {
      applyValues([value?.[0] || min, newValue]);
    }
  }, 700);
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    (e.target as HTMLInputElement).blur();
  }
}

function handleSliderCommit(value: number[]) {
  onValueCommit?.(value);
}

function handleSliderChange(newValue: number[]) {
  onValueChange?.(newValue);
}
</script>

<div
  class={[styles.container, styles.sizes[size], { [styles.active]: isActive }, className]}
  bind:this={ref}
  style:width={calculatedWidth}
  {...restProps}
>
  <Typography class={styles.text} color="muted" variant="caption">
    от
  </Typography>

  <input
    id={minInputId}
    class={styles.input}
    type="text"
    inputmode="numeric"
    name="min"
    value={innerMin}
    oninput={handleInput}
    onkeydown={handleKeyDown}
  >

  <Typography class={styles.text} color="muted" variant="caption">
    до
  </Typography>

  <input
    id={maxInputId}
    class={styles.input}
    type="text"
    inputmode="numeric"
    name="max"
    value={innerMax}
    oninput={handleInput}
    onkeydown={handleKeyDown}
  >

  <Typography class={styles.text} color="muted" variant="caption">
    {unit}
  </Typography>

  <Slider
    trackClass={styles.track}
    class={styles.slider}
    {min}
    {max}
    {size}
    step={adaptiveStep}
    style="position: absolute;"
    type="multiple"
    bind:value
    onValueCommit={handleSliderCommit}
    onValueChange={handleSliderChange}
  />
</div>
