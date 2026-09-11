<script lang="ts">
import { ChevronRightIcon } from '@lucide/svelte';
import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';

let {
  ref = $bindable(null),
  class: className,
  inset,
  children,
  ...restProps
}: DropdownMenuPrimitive.SubTriggerProps & {
  inset?: boolean;
} = $props();
</script>

<DropdownMenuPrimitive.SubTrigger
  bind:ref
  data-slot="dropdown-menu-sub-trigger"
  data-inset={inset}
  class={["sub-trigger", className]}
  {...restProps}
>
  {@render children?.()}
  <ChevronRightIcon class="dropdown-menu-sub-trigger-icon" />
</DropdownMenuPrimitive.SubTrigger>

<style>
@layer max-ts-svelte-components {
  :global([data-slot="dropdown-menu-sub-trigger"].sub-trigger) {
    display: flex;
    cursor: default;
    align-items: center;
    gap: var(--spacing-2);
    border-radius: var(--radius-small);
    padding-left: var(--spacing-2);
    padding-right: var(--spacing-2);
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    font-size: var(--fontSize-sm);
    outline: 2px solid transparent;
    outline-offset: 2px;
    user-select: none;
  }
  :global(
    [data-slot="dropdown-menu-sub-trigger"].sub-trigger[data-highlighted]
  ),
  :global(
    [data-slot="dropdown-menu-sub-trigger"].sub-trigger[data-state="open"]
  ) {
    background-color: var(--colors-background-elementHover);
    color: var(--colors-text-primary);
  }
  :global([data-slot="dropdown-menu-sub-trigger"].sub-trigger[data-disabled]) {
    pointer-events: none;
    opacity: 0.5;
  }
  :global([data-slot="dropdown-menu-sub-trigger"].sub-trigger[data-inset]) {
    padding-inline-start: var(--spacing-8);
  }
  :global([data-slot="dropdown-menu-sub-trigger"].sub-trigger) :global(svg) {
    color: var(--colors-text-hint);
    height: var(--spacing-4);
    width: var(--spacing-4);
  }
  :global(.dropdown-menu-sub-trigger-icon) {
    margin-inline-start: auto;
    width: var(--spacing-4);
    height: var(--spacing-4);
  }
}
</style>
