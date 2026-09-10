<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '../../../types.ts';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div bind:this={ref} class={["months", className]} {...restProps}>
  {@render children?.()}
</div>

<style>
.months {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}
@media (min-width: 48rem) {
  .months {
    flex-direction: row;
  }
}
</style>
