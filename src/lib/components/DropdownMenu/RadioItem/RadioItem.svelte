<script lang="ts">
import { CircleIcon } from '@lucide/svelte';
import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
import type { WithoutChild } from '../../../types.ts';

let {
  ref = $bindable(null),
  class: className,
  children: childrenProp,
  ...restProps
}: WithoutChild<DropdownMenuPrimitive.RadioItemProps> = $props();
</script>

<DropdownMenuPrimitive.RadioItem
  bind:ref
  data-slot="dropdown-menu-radio-item"
  class={["item", className]}
  {...restProps}
>
  {#snippet children({ checked })}
    <span class="indicator">
      {#if checked}
        <CircleIcon class="dropdown-menu-radio-item-icon" />
      {/if}
    </span>
    {@render childrenProp?.({ checked })}
  {/snippet}
</DropdownMenuPrimitive.RadioItem>

<style>
@layer max-ts-svelte-components {
  :global([data-slot="dropdown-menu-radio-item"].item) {
    position: relative;
    display: flex;
    cursor: default;
    align-items: center;
    gap: var(--spacing-2);
    border-radius: var(--radius-small);
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    padding-inline-start: var(--spacing-8);
    padding-inline-end: var(--spacing-2);
    font-size: var(--fontSize-sm);
    outline: 2px solid transparent;
    outline-offset: 2px;
    user-select: none;
  }
  :global([data-slot="dropdown-menu-radio-item"].item:focus) {
    background-color: var(--colors-background-elementHover);
    color: var(--colors-text-primary);
  }
  :global([data-slot="dropdown-menu-radio-item"].item[data-disabled]) {
    pointer-events: none;
    opacity: 0.5;
  }
  .indicator {
    pointer-events: none;
    position: absolute;
    inset-inline-start: var(--spacing-2);
    display: flex;
    width: 0.875rem;
    height: 0.875rem;
    align-items: center;
    justify-content: center;
  }
  :global(.dropdown-menu-radio-item-icon) {
    width: var(--spacing-2);
    height: var(--spacing-2);
    fill: currentColor;
  }
}
</style>
