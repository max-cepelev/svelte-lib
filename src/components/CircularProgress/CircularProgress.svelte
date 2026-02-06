<script lang="ts">
import styles from './styles.css';
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
</script>

<div
  style:with={size + 'px'}
  style:height={size + 'px'}
  class={[styles.root, styles.variants[variant], styles.colors[color], className]}
>
  <svg class={styles.svg} viewBox={viewBox}>
    <title>Progress bar</title>
    <circle
      class={styles.circle}
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
