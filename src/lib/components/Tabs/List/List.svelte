<script lang="ts">
import { Tabs as TabsPrimitive } from 'bits-ui';

import type { TabsListProps } from '../types';
import { observeActiveTab } from './scrollActiveTab';

let {
  ref = $bindable(null),
  variant = 'default',
  class: className,
  children,
  ...restProps
}: TabsListProps = $props();

$effect(() => {
  if (ref) return observeActiveTab(ref);
});
</script>

<TabsPrimitive.List
  bind:ref
  data-slot="tabs-list"
  data-variant={variant}
  class={className}
  {...restProps}
>
  {@render children?.()}
</TabsPrimitive.List>

<style>
@layer max-ts-svelte-components {
  :global {
    [data-slot="tabs-list"] {
      display: inline-flex;
      width: fit-content;
      max-width: 100%;
      align-items: center;
      justify-content: safe center;
      overflow-x: auto;
      scrollbar-width: none;
      border-radius: var(--radius-medium);
      padding: var(--spacing-1);
      color: var(--colors-text-secondary);
      &::-webkit-scrollbar {
        display: none;
      }
      &[data-variant="default"] {
        background-color: var(--colors-background-element);
      }
      &[data-variant="line"] {
        gap: var(--spacing-1);
        border-radius: 0;
        background-color: transparent;
      }
      &[data-orientation="horizontal"] {
        height: var(--spacing-8);
        gap: var(--spacing-1);
      }
      &[data-orientation="vertical"] {
        height: fit-content;
        flex-direction: column;
      }
      &[data-variant="group"] {
        gap: 0;
        padding: 0;
        background-color: transparent;
      }
    }
  }
}
</style>
