<script lang="ts">
import { Tabs as TabsPrimitive } from 'bits-ui';

import type { TabsListProps } from '../types';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: TabsListProps = $props();
</script>

<TabsPrimitive.List
  bind:ref
  data-slot="tabs-list"
  class={["list", className]}
  {...restProps}
>
  {@render children?.()}
</TabsPrimitive.List>

<style>
@layer max-ts-svelte-components {
  :global([data-slot="tabs-list"].list) {
    background-color: var(--colors-background-paper);
    color: var(--colors-text-secondary);
    display: inline-flex;
    height: var(--spacing-10);
    width: fit-content;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-medium);
    box-shadow: var(--shadow-3);
    padding: var(--spacing-1);
    gap: var(--spacing-1);
  }
}
</style>
