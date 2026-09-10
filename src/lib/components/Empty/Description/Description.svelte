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
  data-slot="empty-description"
  class={["description", className]}
  {...restProps}
>
  {@render children?.()}
</div>

<style>
.description {
  color: var(--colors-text-secondary);
  font-size: var(--fontSize-sm);
  line-height: var(--lineHeight-relaxed);
}
.description > :global(a) {
  text-decoration: underline;
  text-underline-offset: 4px;
}
.description > :global(a:hover) {
  color: var(--colors-primary);
}
</style>
