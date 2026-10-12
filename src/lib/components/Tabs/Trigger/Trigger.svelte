<script lang="ts">
import { Tabs as TabsPrimitive } from 'bits-ui';

import { getTabsListContext } from '../context.svelte';
import type { TabsTriggerProps } from '../types';

type TriggerChildProps = Parameters<
  NonNullable<TabsPrimitive.TriggerProps['child']>
>[0];

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: TabsTriggerProps = $props();

const list = getTabsListContext();
</script>

{#snippet trigger({ props }: TriggerChildProps)}
  {@const { class: triggerClass, type = 'button', ...triggerProps } = props}
  <button
    {...triggerProps}
    class={["trigger", triggerClass]}
    data-variant={list?.variant ?? "default"}
    {type}
  >
    {@render children?.()}
  </button>
{/snippet}

<TabsPrimitive.Trigger
  bind:ref
  child={trigger}
  data-slot="tabs-trigger"
  class={className}
  {...restProps}
/>

<style>
@layer max-ts-svelte-components {
  .trigger {
    position: relative;
    display: inline-flex;
    height: 100%;
    flex: 1;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-2);
    border: 1px solid transparent;
    border-radius: var(--radius-small);
    background-color: transparent;
    padding: 0 var(--spacing-1);
    opacity: 0.8;
    font-family: inherit;
    font-size: var(--fontSize-sm);
    font-weight: var(--fontWeight-medium);
    line-height: var(--lineHeight-tight);
    white-space: nowrap;
    cursor: pointer;
    transition:
      background-color 0.2s ease,
      border-color 0.2s ease,
      color 0.2s ease,
      box-shadow 0.2s ease;
    &::after {
      position: absolute;
      content: "";
      background-color: var(--colors-primary);
      opacity: 0;
      transition: opacity 0.2s ease;
    }
    &:hover {
      color: var(--colors-text-primary);
    }
    &:focus-visible {
      border-color: var(--colors-primary);
      outline: none;
      box-shadow: 0 0 0 3px
        color-mix(in oklch, var(--colors-primary) 20%, transparent);
    }
    &:disabled,
    &[aria-disabled="true"] {
      pointer-events: none;
      opacity: 0.5;
    }
    &[data-state="active"] {
      background-color: var(--colors-background-paper);
      color: var(--colors-text-primary);
      box-shadow: var(--elevation-1);
      opacity: 1;
    }
    &[data-orientation="vertical"] {
      width: 100%;
      min-height: calc(var(--spacing-6) + var(--spacing-1));
      justify-content: flex-start;
    }
    &[data-orientation="horizontal"]::after {
      right: 0;
      bottom: calc(-1 * var(--spacing-1));
      left: 0;
      height: 2px;
    }
    &[data-orientation="vertical"]::after {
      top: 0;
      right: calc(-1 * var(--spacing-1));
      bottom: 0;
      width: 2px;
    }
    &[data-variant="line"][data-state="active"] {
      border-color: transparent;
      background-color: transparent;
      box-shadow: none;
      &::after {
        opacity: 1;
      }
    }
    & :global(svg) {
      width: var(--spacing-4);
      height: var(--spacing-4);
      flex-shrink: 0;
      pointer-events: none;
    }
  }
}
</style>
