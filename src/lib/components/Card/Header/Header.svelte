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
  data-slot="card-header"
  class={["header", className]}
  {...restProps}
>
  {@render children?.()}
</div>

<style>
.header {
  display: grid;
  grid-auto-rows: min-content;
  grid-template-rows: auto auto;
  align-items: start;
  gap: var(--spacing-2);
  padding-left: var(--spacing-6);
  padding-right: var(--spacing-6);
  &:global([data-slot="card-action"]) {
    grid-template-columns: 1fr auto;
  }
  & > :global([data-slot="card-action"]) {
    grid-column: 2;
    grid-row-start: 1;
    grid-row-end: span 2;
    justify-self: end;
  }
}
</style>
