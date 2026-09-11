<script lang="ts">
import { onDestroy, untrack } from 'svelte';
import { calculateSize } from '../../utils';

import { Slider } from '../Slider';
import { getSliderStep, getSliderSteps, snapSliderValue } from '../Slider/step';
import { Typography } from '../Typography';
import type { RangeInputProps, RangeInputValue } from './types';
import {
  clamp,
  formatNumber,
  normalizeRangeValue,
  parseFormattedNumber,
} from './utils';

type RangeField = 'min' | 'max';

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
  isActive,
  ref = $bindable(null),
  onValueChange,
  onValueCommit,
  minInputId = `${uid}-min`,
  maxInputId = `${uid}-max`,
  ...restProps
}: RangeInputProps = $props();

const timers: Partial<Record<RangeField, ReturnType<typeof setTimeout>>> = {};
const dirtyFields: Record<RangeField, boolean> = { min: false, max: false };
const calculatedWidth = $derived(calculateSize(width));
const sliderStep = $derived(getSliderStep(min, max, step));
const sliderSteps = $derived(getSliderSteps(min, max, sliderStep));

let innerValue = $state<number[]>([0, 0]);
let minInputValue = $state('');
let maxInputValue = $state('');
let activeField = $state<RangeField | null>(null);

function rangesEqual(
  first: readonly number[] | undefined,
  second: RangeInputValue,
) {
  return first?.[0] === second[0] && first?.[1] === second[1];
}

function normalizeValue(nextValue: readonly number[] | undefined) {
  const normalized = normalizeRangeValue(nextValue, min, max);

  return normalized.map((item) =>
    snapSliderValue(item, min, max, sliderSteps),
  ) as RangeInputValue;
}

function syncInputValues(nextValue: RangeInputValue, force = false) {
  if (force || activeField !== 'min') {
    minInputValue = formatNumber(nextValue[0]);
  }
  if (force || activeField !== 'max') {
    maxInputValue = formatNumber(nextValue[1]);
  }
}

function syncFromProps(nextValue: RangeInputValue) {
  if (!rangesEqual(innerValue, nextValue)) {
    innerValue = nextValue;
  }
  syncInputValues(nextValue);
}

function updateValue(nextValue: readonly number[], commit = false) {
  const normalized = normalizeValue(nextValue);
  const changed = !rangesEqual(normalizeValue(value), normalized);

  if (!rangesEqual(innerValue, normalized)) {
    innerValue = normalized;
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

function clearInputTimer(field: RangeField) {
  clearTimeout(timers[field]);
  timers[field] = undefined;
}

function getInputValue(field: RangeField) {
  return field === 'min' ? minInputValue : maxInputValue;
}

function applyInputValue(
  field: RangeField,
  inputValue: string,
  commit = false,
) {
  const parsedValue = parseFormattedNumber(inputValue);
  if (Number.isNaN(parsedValue)) return;

  const [currentMin, currentMax] = normalizeRangeValue(innerValue, min, max);
  const nextValue: RangeInputValue =
    field === 'min'
      ? [clamp(parsedValue, min, currentMax), currentMax]
      : [currentMin, clamp(parsedValue, currentMin, max)];

  return updateValue(nextValue, commit);
}

function handleInput(event: Event) {
  const target = event.currentTarget as HTMLInputElement;
  const field = target.name as RangeField;
  const inputValue = target.value;

  dirtyFields[field] = true;
  clearInputTimer(field);
  timers[field] = setTimeout(() => {
    timers[field] = undefined;
    applyInputValue(field, inputValue);
  }, 700);
}

function handleBlur(field: RangeField) {
  clearInputTimer(field);
  activeField = null;

  if (!dirtyFields[field]) {
    syncInputValues(normalizeRangeValue(innerValue, min, max), true);
    return;
  }

  dirtyFields[field] = false;

  const nextValue = applyInputValue(field, getInputValue(field), true);
  syncInputValues(nextValue ?? normalizeRangeValue(innerValue, min, max), true);
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    (e.target as HTMLInputElement).blur();
  }
}

function handleSliderCommit(nextValue: number[]) {
  updateValue(nextValue, true);
}

function handleSliderChange(newValue: number[]) {
  untrack(() => updateValue(newValue));
}

function getValueFromProps() {
  return normalizeValue(value);
}

syncFromProps(getValueFromProps());

$effect.pre(() => {
  const nextValue = getValueFromProps();
  untrack(() => syncFromProps(nextValue));
});

onDestroy(() => {
  clearInputTimer('min');
  clearInputTimer('max');
});
</script>

<div
  bind:this={ref}
  style:width={calculatedWidth}
  {...restProps}
  class={["container", className]}
  data-active={isActive || undefined}
  data-size={size}
>
  <label for={minInputId}>
    <Typography class="text" color="muted" variant="body2"> от </Typography>
  </label>

  <input
    id={minInputId}
    class="input"
    type="text"
    inputmode="decimal"
    name="min"
    bind:value={minInputValue}
    onblur={() => handleBlur('min')}
    onfocus={() => (activeField = 'min')}
    oninput={handleInput}
    onkeydown={handleKeyDown}
  >

  <label for={maxInputId}>
    <Typography class="text" color="muted" variant="body2"> до </Typography>
  </label>

  <input
    id={maxInputId}
    class="input"
    type="text"
    inputmode="decimal"
    name="max"
    bind:value={maxInputValue}
    onblur={() => handleBlur('max')}
    onfocus={() => (activeField = 'max')}
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
    step={sliderSteps}
    style="position: absolute;"
    type="multiple"
    bind:value={innerValue}
    onValueCommit={handleSliderCommit}
    onValueChange={handleSliderChange}
  />
</div>

<style>
@layer max-ts-svelte-components {
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
}
</style>
