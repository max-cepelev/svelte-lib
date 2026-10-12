<script lang="ts">
import { Tabs as TabsPrimitive } from 'bits-ui';

import { setTabsListContext } from '../context.svelte';
import type { TabsListProps } from '../types';
import { observeActiveTab } from './scrollActiveTab';

type ListChildProps = Parameters<
  NonNullable<TabsPrimitive.ListProps['child']>
>[0];

let {
  ref = $bindable(null),
  variant = 'default',
  class: className,
  children,
  ...restProps
}: TabsListProps = $props();

setTabsListContext({
  get variant() {
    return variant;
  },
});

$effect(() => {
  if (ref) return observeActiveTab(ref);
});
</script>

{#snippet list({
  props,
}: ListChildProps)}
  {@const { class: listClass, ...listProps } = props}
  <div {...listProps} class={['list', listClass]}>
    {@render children?.()}
  </div>
{/snippet}

<TabsPrimitive.List
  bind:ref
  child={list}
  data-slot="tabs-list"
  data-variant={variant}
  class={className}
  {...restProps}
/>

<style>
@layer max-ts-svelte-components {
  .list {
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
  }
}
</style>
