<script lang="ts">
import type { CircularProgressProps } from './types';

let {
  size = 30,
  thickness = 2.6,
  color = 'primary',
  value = 0,
  variant = 'indeterminate',
  class: className,
}: CircularProgressProps = $props();

// Реактивные вычисления
const radius = $derived((size - thickness) / 2);
const circumference = $derived(2 * Math.PI * radius);
const dashOffset = $derived(
  variant === 'determinate'
    ? circumference * (1 - value / 100)
    : circumference * 0.25,
);
const viewBox = $derived(`0 0 ${size} ${size}`);
const sizeValue = $derived(`${size}px`);
</script>

<div
  style:width={sizeValue}
  style:height={sizeValue}
  data-variant={variant}
  data-color={color}
  class={["root", className]}
>
  <svg class="svg" {viewBox}>
    <title>Progress bar</title>
    <circle
      class="circle"
      cx={size / 2}
      cy={size / 2}
      r={radius}
      fill="none"
      style:stroke-width={thickness}
      style:stroke-dasharray={circumference}
      style:stroke-dashoffset={dashOffset}
    />
  </svg>
</div>

<style>
.svg {
  display: block;
  width: 100%;
  height: 100%;
  transform-origin: center;
}
.circle {
  stroke: currentColor;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.35s;
}
.root {
  display: inline-block;
  position: relative;
  overflow: hidden;

  &[data-color="primary"] {
    color: var(--colors-primary);
  }
  &[data-color="secondary"] {
    color: var(--colors-secondary);
  }
  &[data-color="inherit"] {
    color: inherit;
  }

  &[data-variant="determinate"] {
    & .svg {
      transform: rotate(-90deg);
    }
  }

  &[data-variant="indeterminate"] {
    animation: rotate 1.4s linear infinite;
    & .circle {
      animation: dash 1.4s ease-in-out infinite;
    }
  }
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 100, 200;
    stroke-dashoffset: -15px;
  }
  100% {
    stroke-dasharray: 100, 200;
    stroke-dashoffset: -125px;
  }
}
</style>
