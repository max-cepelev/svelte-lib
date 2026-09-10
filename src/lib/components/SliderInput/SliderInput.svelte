<script lang="ts">
import { onDestroy } from 'svelte';
import { calculateSize } from '../../utils';
import { Slider } from '../Slider';
import { getSliderStep, snapSliderValue } from '../Slider/step';
import { Typography } from '../Typography';

import type { SliderInputProps } from './types';
import { formatNumber, parseFormattedNumber } from './utils';

const uid = $props.id();

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
  id = `${uid}-input`,
  ...restProps
}: SliderInputProps = $props();

let timerId: ReturnType<typeof setTimeout> | undefined;
const calculatedWidth = $derived(calculateSize(width));
const sliderStep = $derived(getSliderStep(min, max, step));

let innerValue = $state(0);
let inputValue = $state('');
let inputFocused = $state(false);
let inputDirty = false;

function normalizeValue(nextValue: number | undefined) {
  const finiteValue = Number.isFinite(nextValue) ? (nextValue as number) : min;
  return snapSliderValue(finiteValue, min, max, sliderStep);
}

function syncFromProps(nextValue: number) {
  if (innerValue !== nextValue) {
    innerValue = nextValue;
  }

  if (!inputFocused) {
    inputValue = formatNumber(nextValue);
  }
}

function updateValue(nextValue: number, commit = false) {
  const normalized = normalizeValue(nextValue);
  const changed = value !== normalized;

  if (innerValue !== normalized) {
    innerValue = normalized;
  }

  if (!inputFocused) {
    inputValue = formatNumber(normalized);
  }

  if (changed) {
    value = normalized;
    onValueChange?.(normalized);
  }

  if (commit) {
    onValueCommit?.(normalized);
  }

  return normalized;
}

function clearInputTimer() {
  clearTimeout(timerId);
  timerId = undefined;
}

function applyInputValue(nextInputValue: string, commit = false) {
  const parsedValue = parseFormattedNumber(nextInputValue);
  if (Number.isNaN(parsedValue)) return;

  return updateValue(parsedValue, commit);
}

function handleInput(event: Event) {
  const nextInputValue = (event.currentTarget as HTMLInputElement).value;

  inputDirty = true;
  clearInputTimer();
  timerId = setTimeout(() => {
    timerId = undefined;
    applyInputValue(nextInputValue);
  }, 700);
}

function handleBlur() {
  clearInputTimer();
  inputFocused = false;

  if (!inputDirty) {
    inputValue = formatNumber(normalizeValue(innerValue));
    return;
  }

  inputDirty = false;
  const nextValue = applyInputValue(inputValue, true);
  inputValue = formatNumber(nextValue ?? normalizeValue(innerValue));
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    (e.target as HTMLInputElement).blur();
  }
}

function handleSliderCommit(nextValue: number) {
  updateValue(nextValue, true);
}

function handleSliderChange(nextValue: number) {
  updateValue(nextValue);
}

syncFromProps(normalizeValue(value));

$effect(() => {
  syncFromProps(normalizeValue(value));
});

onDestroy(clearInputTimer);
</script>

<div
  bind:this={ref}
  style:width={calculatedWidth}
  {...restProps}
  class={["container", className]}
  data-active={isActive || undefined}
  data-size={size}
>
  <input
    class="input"
    type="text"
    inputmode="decimal"
    bind:value={inputValue}
    onblur={handleBlur}
    onfocus={() => (inputFocused = true)}
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
    step={sliderStep}
    class="slider"
    trackClass={"track"}
    type="single"
    bind:value={innerValue}
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

  &[data-active] {
    border-color: var(--colors-primary);
  }
  &[data-size="small"] {
    padding: 0.125rem var(--spacing-2);
    height: 28px;
    font-size: var(--fontSize-sm);
  }
  &[data-size="medium"] {
    padding: var(--spacing-1) var(--spacing-3);
    height: 36px;
    font-size: var(--fontSize-base);
  }
  &[data-size="large"] {
    padding: var(--spacing-2) var(--spacing-4);
    height: 44px;
    font-size: var(--fontSize-lg);
  }
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
