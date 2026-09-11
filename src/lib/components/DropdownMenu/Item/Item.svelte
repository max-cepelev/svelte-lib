<script lang="ts">
import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';

let {
  ref = $bindable(null),
  class: className,
  inset,
  variant = 'default',
  ...restProps
}: DropdownMenuPrimitive.ItemProps & {
  inset?: boolean;
  variant?: 'default' | 'destructive';
} = $props();
</script>

<DropdownMenuPrimitive.Item
  bind:ref
  data-slot="dropdown-menu-item"
  data-inset={inset}
  data-variant={variant}
  class={["root", className]}
  {...restProps}
/>

<style>
@layer max-ts-svelte-components {
  :global([data-slot="dropdown-menu-item"].root) {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    cursor: default;
    padding-left: var(--spacing-2);
    padding-right: var(--spacing-2);
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    border-radius: var(--radius-small);
    font-size: var(--fontSize-sm);
    user-select: none;
    outline: none;
  }
  :global([data-slot="dropdown-menu-item"].root[data-highlighted]) {
    background-color: var(--colors-background-elementHover);
    color: var(--colors-text-primary);
  }
  :global([data-slot="dropdown-menu-item"].root[data-disabled]) {
    pointer-events: none;
    opacity: 0.5;
  }
  :global([data-slot="dropdown-menu-item"].root[data-inset]) {
    padding-left: var(--spacing-8);
  }
  :global([data-slot="dropdown-menu-item"].root) :global(svg) {
    color: var(--colors-text-hint);
    height: var(--spacing-4);
    width: var(--spacing-4);
  }
}
</style>
