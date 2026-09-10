<script lang="ts">
import { calculateSize } from '../../utils';

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
  minInputId = 'min',
  maxInputId = 'max',
  ...restProps
}: RangeInputProps = $props();

let timerId: NodeJS.Timeout | undefined;
const calculatedWidth = $derived(calculateSize(width));

// svelte-ignore state_referenced_locally
let innerValue = $state([value?.[0] || min, value?.[1] || max]);

let innerMin = $derived(formatNumber(innerValue[0]));
let innerMax = $derived(formatNumber(innerValue[1]));

$effect(() => {
  innerValue = [value?.[0] || min, value?.[1] || max];
});

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
  class={["container", `size-${size}`, { 'active': isActive }, className]}
  bind:this={ref}
  style:width={calculatedWidth}
  {...restProps}
>
  <Typography class="text" color="muted" variant="body2"> от </Typography>

  <input
    id={minInputId}
    class="input"
    type="text"
    inputmode="numeric"
    name="min"
    value={innerMin}
    oninput={handleInput}
    onkeydown={handleKeyDown}
  >

  <Typography class="text" color="muted" variant="body2"> до </Typography>

  <input
    id={maxInputId}
    class="input"
    type="text"
    inputmode="numeric"
    name="max"
    value={innerMax}
    oninput={handleInput}
    onkeydown={handleKeyDown}
  >

  <Typography class="text" color="muted" variant="body2">
    {unit}
  </Typography>

  <Slider
    trackClass={"track"}
    class="slider"
    {min}
    {max}
    {size}
    step={adaptiveStep}
    style="position: absolute;"
    type="multiple"
    bind:value={innerValue}
    onValueCommit={handleSliderCommit}
    onValueChange={handleSliderChange}
  />
</div>

<style>
.container {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr auto 1fr auto;
  align-items: center;
  column-gap: var(--spacing-1);
  background: var(--colors-background-paper);
  border: 1px solid var(--colors-border);
  border-radius: var(--radius-medium);
  transition: border 0.2s;
}
.active {
  border-color: var(--colors-primary);
}
.size-small {
  padding: 0.125rem var(--spacing-2);
  height: 28px;
  font-size: var(--fontSize-sm);
}
.size-medium {
  padding: var(--spacing-1) var(--spacing-3);
  height: 36px;
  font-size: var(--fontSize-base);
}
.size-large {
  padding: var(--spacing-2) var(--spacing-4);
  height: 44px;
  font-size: var(--fontSize-lg);
}
.container :global(.text) {
  font-size: inherit;
}
.input {
  text-align: center;
  width: 100%;
  min-width: 24px;
  border: none;
  font-size: inherit;
  text-wrap: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  outline: none;
  background: transparent;
  color: inherit;
}
.input:focus {
  border: none;
}
.container :global(.slider) {
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
}
.container :global(.track.track) {
  background-color: transparent;
}
@media (max-width: 600px) {
  .container {
    width: 100%;
  }
}
</style>
