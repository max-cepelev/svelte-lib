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
  data-slot="item-content"
  class={["content", className]}
  {...restProps}
>
  {@render children?.()}
</div>

<style>
.content {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--spacing-1);
}
.content + :global([data-slot="item-content"]) {
  flex: none;
}
</style>
