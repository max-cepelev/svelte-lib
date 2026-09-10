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

<div
  bind:this={ref}
  data-slot="item-header"
  class={["header", className]}
  {...restProps}
>
  {@render children?.()}
</div>

<style>
.header {
  display: flex;
  flex-basis: 100%;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-2);
}
</style>
