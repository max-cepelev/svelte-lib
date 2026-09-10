<script lang="ts">
import { CheckIcon, MinusIcon } from '@lucide/svelte';
import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
import type { Snippet } from 'svelte';
import type { WithoutChildrenOrChild } from '../../../types.ts';

let {
  ref = $bindable(null),
  checked = $bindable(false),
  indeterminate = $bindable(false),
  class: className,
  children: childrenProp,
  ...restProps
}: WithoutChildrenOrChild<DropdownMenuPrimitive.CheckboxItemProps> & {
  children?: Snippet;
} = $props();
</script>

<DropdownMenuPrimitive.CheckboxItem
  bind:ref
  bind:checked
  bind:indeterminate
  data-slot="dropdown-menu-checkbox-item"
  class={["root", className]}
  {...restProps}
>
  {#snippet children({ checked, indeterminate })}
    <span class="icon-wrapper">
      {#if indeterminate}
        <MinusIcon size={16} />
      {:else}
        <CheckIcon
          size={16}
          class={{
            'dropdown-menu-checkbox-item-unchecked': !checked,
          }}
        />
      {/if}
    </span>
    {@render childrenProp?.()}
  {/snippet}
</DropdownMenuPrimitive.CheckboxItem>

<style>
:global(.dropdown-menu-checkbox-item-unchecked) {
  color: transparent;
}
:global([data-slot="dropdown-menu-checkbox-item"].root) {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
  padding-left: var(--spacing-8);
  padding-right: var(--spacing-2);
  border-radius: var(--radius-small);
  font-size: var(--fontSize-sm);
  cursor: default;
  user-select: none;
  outline: none;
}
:global([data-slot="dropdown-menu-checkbox-item"].root:focus) {
  background-color: var(--colors-background-elementHover);
  color: var(--colors-foreground-secondary);
}
:global([data-slot="dropdown-menu-checkbox-item"].root[data-disabled]) {
  pointer-events: none;
  opacity: 0.5;
}
:global([data-slot="dropdown-menu-checkbox-item"].root) :global(svg) {
  pointer-events: none;
  flex-shrink: 0;
  width: var(--spacing-4);
  height: var(--spacing-4);
}
.icon-wrapper {
  position: absolute;
  left: var(--spacing-2);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  width: 0.875rem;
  height: 0.875rem;
}
</style>
