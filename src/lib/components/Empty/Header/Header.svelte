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
  data-slot="empty-header"
  class={["header", className]}
  {...restProps}
>
  {@render children?.()}
</div>

<style>
.header {
  display: flex;
  max-width: 24rem;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-2);
  text-align: center;
}
</style>
