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
  data-slot="empty-title"
  class={["title", className]}
  {...restProps}
>
  {@render children?.()}
</div>

<style>
.title {
  font-size: var(--fontSize-lg);
  font-weight: var(--fontWeight-medium);
  letter-spacing: -0.025em;
}
</style>
