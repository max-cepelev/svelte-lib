<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '../../../types.ts';

let {
  ref = $bindable(null),
  class: className,
  variant = 'legend',
  children,
  ...restProps
}: WithElementRef<HTMLAttributes<HTMLLegendElement>> & {
  variant?: 'legend' | 'label';
} = $props();
</script>

<legend
  bind:this={ref}
  data-slot="field-legend"
  data-variant={variant}
  class={["root", className]}
  {...restProps}
>
  {@render children?.()}
</legend>

<style>
.root {
  margin-bottom: var(--spacing-2);
  font-weight: var(--fontWeight-medium);
}
.root[data-variant="legend"] {
  font-size: var(--fontSize-base);
}
.root[data-variant="label"] {
  font-size: var(--fontSize-sm);
}
</style>
