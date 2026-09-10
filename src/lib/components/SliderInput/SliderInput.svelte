<script lang="ts">
import { Typography } from '../Typography';
import { Slider } from '../Slider';

import type { SliderInputProps } from './types';
import { formatNumber, parseFormattedNumber } from './utils';
import { calculateSize } from '../../utils';

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
  class={["container", `size-${size}`, { 'active': isActive }, className]}
  bind:this={ref}
  style:width={calculatedWidth}
  {...restProps}
>
  <input
    class="input"
    type="text"
    inputmode="numeric"
    value={innerDisplayValue}
    oninput={handleInput}
    onkeydown={handleKeyDown}
    {id}
    {name}
  >

  <Typography class="text" color="muted" variant="caption">
    {unit}
  </Typography>

  <Slider
    {min}
    {max}
    {size}
    step={adaptiveStep}
    class="slider"
    trackClass={"track"}
    type="single"
    bind:value
    onValueCommit={handleSliderCommit}
    onValueChange={handleSliderChange}
  />
</div>

<style>
.container {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
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
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - var(--radius-large));
  border-radius: 9999px;
}
.container :global(.track) {
  background-color: transparent;
}
@media (max-width: 600px) {
  .container {
    width: 100%;
  }
}
</style>
