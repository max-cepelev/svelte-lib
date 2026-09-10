<script lang="ts">
import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
import type { ComponentProps } from 'svelte';

let {
  ref = $bindable(null),
  class: className,
  inset,
  ...restProps
}: ComponentProps<typeof DropdownMenuPrimitive.GroupHeading> & {
  inset?: boolean;
} = $props();
</script>

<DropdownMenuPrimitive.GroupHeading
  bind:ref
  data-slot="dropdown-menu-group-heading"
  data-inset={inset}
  class={["root", className]}
  {...restProps}
/>

<style>
:global([data-slot="dropdown-menu-group-heading"].root) {
  padding-left: var(--spacing-2);
  padding-right: var(--spacing-2);
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
  font-size: var(--fontSize-sm);
  font-weight: var(--fontWeight-semibold);
}
:global([data-slot="dropdown-menu-group-heading"].root[data-inset]) {
  padding-left: var(--spacing-8);
}
</style>
