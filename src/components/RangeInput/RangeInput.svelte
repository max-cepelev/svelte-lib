<script lang="ts">
import { calculateSize } from '~/utils';
import { Slider } from '../Slider';
import { Typography } from '../Typography';
import styles from './styles.css';
import type { RangeInputProps } from './types';
import { formatNumber, parseFormattedNumber } from './utils';

let {
  min = 0,
  max = 100,
  minValue = $bindable(min),
  maxValue = $bindable(max),
  width = 180,
  step = 1,
  unit,
  size = 'medium',
  class: className,
  isActive,
  ref = $bindable(null),
  onValueChange,
  ...restProps
}: RangeInputProps = $props();

// Внутреннее состояние для редактирования
let innerMin = $state(minValue);
let innerMax = $state(maxValue);

// Синхронизация с пропсами при внешних изменениях
$effect(() => {
  innerMin = minValue;
  innerMax = maxValue;
});

const calculatedWidth = $derived(calculateSize(width));
const innerMinDisplay = $derived(formatNumber(innerMin));
const innerMaxDisplay = $derived(formatNumber(innerMax));

const adaptiveStep = $derived.by(() => {
  const range = max - min;
  const MAX_STEPS = 1000;
  return Math.max(step, Math.ceil(range / MAX_STEPS));
});

// Применение и коммит значений
function applyValues(newMin: number, newMax: number) {
  const clampedMin = Math.max(min, Math.min(newMin, newMax));
  const clampedMax = Math.min(max, Math.max(newMax, newMin));

  innerMin = clampedMin;
  innerMax = clampedMax;

  // Обновляем bindable пропсы
  minValue = clampedMin;
  maxValue = clampedMax;

  onValueChange?.([clampedMin, clampedMax]);
}

// Обработчики инпутов
function handleInput(e: Event) {
  const target = e.target as HTMLInputElement;
  let value = parseFormattedNumber(target.value.replace(/[^\d\s]/g, ''));

  if (Number.isNaN(value)) {
    value = target.name === 'min' ? min : max;
  }

  if (target.name === 'min') {
    applyValues(Math.max(min, Math.min(value, innerMax)), innerMax);
  } else {
    applyValues(innerMin, Math.min(max, Math.max(value, innerMin)));
  }
}

function handleBlur() {
  // При blur коммитим финальное значение
  applyValues(innerMin, innerMax);
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    (e.target as HTMLInputElement).blur();
  }
}

// Слайдер коммитит при mouseup
function handleSliderChange(value: number[]) {
  if (value.length === 2) {
    innerMin = value[0];
    innerMax = value[1];
  }
}

function handleSliderCommit(value: number[]) {
  if (value.length === 2) {
    applyValues(value[0], value[1]);
  }
}
</script>

<div
  class={[styles.container, styles.sizes[size], { [styles.active]: isActive }, className]}
  bind:this={ref}
  style:width={calculatedWidth}
  {...restProps}
>
  <Typography class={styles.text} color="disabled" variant="body2">
    от
  </Typography>

  <input
    class={styles.input}
    type="text"
    inputmode="numeric"
    name="min"
    value={innerMinDisplay}
    oninput={handleInput}
    onblur={handleBlur}
    onkeydown={handleKeyDown}
  >

  <Typography class={styles.text} color="disabled" variant="body2">
    до
  </Typography>

  <input
    class={styles.input}
    type="text"
    inputmode="numeric"
    name="max"
    value={innerMaxDisplay}
    oninput={handleInput}
    onblur={handleBlur}
    onkeydown={handleKeyDown}
  >

  <Typography class={styles.text} color="disabled" variant="body2">
    {unit}
  </Typography>

  <Slider
    {min}
    {max}
    {size}
    step={adaptiveStep}
    class={styles.slider}
    type="multiple"
    value={[innerMin, innerMax]}
    onValueChange={handleSliderChange}
    onValueCommit={handleSliderCommit}
  />
</div>
