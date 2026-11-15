<script lang="ts">
import { Tabs as TabsPrimitive } from 'bits-ui';

import { observeActiveIndicator } from '../../../observeActiveIndicator';
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

$effect(() => {
  if (ref && variant !== 'group') {
    return observeActiveIndicator(ref, {
      itemSelector: '[data-slot="tabs-trigger"]',
      activeState: 'active',
      cssVariablePrefix: '--tabs-indicator',
    });
  }
});
</script>

<TabsPrimitive.List
  bind:ref
  data-slot="tabs-list"
  data-variant={variant}
  class={className}
  {...restProps}
>
  {#if variant !== 'group'}
    <span data-slot="tabs-indicator" aria-hidden="true"></span>
  {/if}
  {@render children?.()}
</TabsPrimitive.List>

<style>
@layer max-ts-svelte-components {
  :global {
    [data-slot="tabs-list"] {
      --tabs-indicator-x: 0px;
      --tabs-indicator-y: 0px;
      --tabs-indicator-width: 0px;
      --tabs-indicator-height: 0px;
      display: inline-flex;
      box-sizing: border-box;
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
      &[data-variant="default"],
      &[data-variant="line"] {
        position: relative;
        isolation: isolate;
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
        height: var(--spacing-9);
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

    [data-slot="tabs-indicator"] {
      position: absolute;
      box-sizing: border-box;
      top: 0;
      left: 0;
      width: var(--tabs-indicator-width);
      height: var(--tabs-indicator-height);
      transform: translate(var(--tabs-indicator-x), var(--tabs-indicator-y));
      visibility: hidden;
      pointer-events: none;
    }

    [data-slot="tabs-list"][data-variant="default"]
      [data-slot="tabs-indicator"] {
      border-radius: var(--radius-small);
      background-color: var(--colors-background-paper);
      box-shadow: var(--elevation-1);
    }

    [data-slot="tabs-list"][data-variant="line"] [data-slot="tabs-indicator"] {
      /* Match the trigger's border box to preserve the underline's position. */
      border: 1px solid transparent;
      &::after {
        position: absolute;
        content: "";
        background-color: var(--colors-primary);
      }
    }

    [data-slot="tabs-list"][data-variant="line"][data-orientation="horizontal"]
      [data-slot="tabs-indicator"]::after {
      right: 0;
      bottom: calc(-1 * var(--spacing-1));
      left: 0;
      height: 2px;
    }

    [data-slot="tabs-list"][data-variant="line"][data-orientation="vertical"]
      [data-slot="tabs-indicator"]::after {
      top: 0;
      right: calc(-1 * var(--spacing-1));
      bottom: 0;
      width: 2px;
    }

    [data-slot="tabs-list"][data-indicator-ready] [data-slot="tabs-indicator"] {
      visibility: visible;
    }

    @media (prefers-reduced-motion: no-preference) {
      [data-slot="tabs-list"][data-indicator-ready="true"]
        [data-slot="tabs-indicator"] {
        transition:
          transform 0.22s ease,
          width 0.22s ease,
          height 0.22s ease;
      }
    }
  }
}
</style>
