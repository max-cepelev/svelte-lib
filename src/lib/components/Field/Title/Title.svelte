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
  data-slot="field-title"
  class={["root", className]}
  {...restProps}
>
  {@render children?.()}
</div>

<style>
.root {
  display: flex;
  width: fit-content;
  align-items: center;
  gap: var(--spacing-2);
  font-size: var(--fontSize-sm);
  line-height: var(--lineHeight-snug);
  font-weight: var(--fontWeight-medium);
}
:global([data-slot="field"][data-disabled="true"]) .root {
  opacity: 0.5;
}
</style>
