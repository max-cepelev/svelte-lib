<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '../../types.ts';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
  bind:this={ref}
  data-slot="card"
  class={["card", className]}
  {...restProps}
>
  {@render children?.()}
</div>

<style>
.card {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
  border-radius: var(--radius-large);
  border: 1px solid var(--colors-border);
  padding: var(--spacing-6) 0;
  background-color: var(--colors-background-paper);
  color: var(--colors-text-primary);
  box-shadow: var(--shadow-2);
}
</style>
