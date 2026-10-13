<script lang="ts">
import type { ProgressBarProps } from './types';
import { clampProgress } from './utils';

let {
  ref = $bindable(null),
  value,
  class: className,
  ...restProps
}: ProgressBarProps = $props();

const clampedValue = $derived(clampProgress(value));
</script>

<div
  {...restProps}
  bind:this={ref}
  data-slot="progress-bar"
  role="progressbar"
  aria-valuemin={0}
  aria-valuemax={100}
  aria-valuenow={clampedValue}
  class={['root', className]}
>
  <div
    data-slot="progress-bar-indicator"
    class="indicator"
    style:transform="scaleX({clampedValue / 100})"
  ></div>
</div>

<style>
@layer max-ts-svelte-components {
  .root {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: var(--spacing-1);
    border-radius: var(--radius-small);
    background-color: var(--colors-background-element);
  }
  .indicator {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background-color: var(--colors-primary);
    transform-origin: left center;
    transition: transform 200ms ease-out;
    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }
}
</style>
