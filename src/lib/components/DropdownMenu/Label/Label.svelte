<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '../../../types.ts';

let {
  ref = $bindable(null),
  class: className,
  inset,
  children,
  ...restProps
}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
  inset?: boolean;
} = $props();
</script>

<div
  bind:this={ref}
  data-slot="dropdown-menu-label"
  data-inset={inset}
  class={["label", className]}
  {...restProps}
>
  {@render children?.()}
</div>

<style>
.label {
  padding-left: var(--spacing-2);
  padding-right: var(--spacing-2);
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
  font-size: var(--fontSize-sm);
  font-weight: var(--fontWeight-semibold);
  color: var(--colors-text-primary);
}
.label[data-inset] {
  padding-left: var(--spacing-8);
}
</style>
