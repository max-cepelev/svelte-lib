<script lang="ts">
import { Tabs as TabsPrimitive } from 'bits-ui';

import type { TabsTriggerProps } from '../types';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: TabsTriggerProps = $props();
</script>

<TabsPrimitive.Trigger
  bind:ref
  data-slot="tabs-trigger"
  class={["trigger", className]}
  {...restProps}
>
  {@render children?.()}
</TabsPrimitive.Trigger>

<style>
:global([data-slot="tabs-trigger"].trigger) {
  color: var(--colors-text-primary);
  display: inline-flex;
  height: calc(100% - 1px);
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-1);
  border-radius: var(--radius-medium);
  border: 1px solid transparent;
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--fontSize-sm);
  font-weight: var(--fontWeight-medium);
  white-space: nowrap;
  transition:
    color 0.2s,
    background-color 0.2s,
    box-shadow 0.2s;
  cursor: pointer;
  outline: none;
}
:global([data-slot="tabs-trigger"].trigger[data-state="active"]) {
  background-color: var(--colors-primary);
  color: var(--colors-foreground-primary);
  box-shadow: var(--shadow-1);
}
:global([data-slot="tabs-trigger"].trigger:focus-visible) {
  border-color: var(--colors-primary);
  box-shadow: 0 0 0 3px
    color-mix(in oklch, var(--colors-primary) 20%, transparent);
  outline: 1px solid var(--colors-primary);
}
:global([data-slot="tabs-trigger"].trigger:disabled) {
  pointer-events: none;
  opacity: 0.5;
}
:global([data-slot="tabs-trigger"].trigger) :global(svg) {
  pointer-events: none;
  flex-shrink: 0;
}
:global([data-slot="tabs-trigger"].trigger) :global(svg:not([class*="size-"])) {
  width: var(--spacing-4);
  height: var(--spacing-4);
}
</style>
