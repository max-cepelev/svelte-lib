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
  class={className}
  {...restProps}
>
  {@render children?.()}
</TabsPrimitive.Trigger>

<style>
@layer max-ts-svelte-components {
  :global {
    [data-slot="tabs-trigger"] {
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
      [data-slot="tabs-list"][data-variant="line"] &[data-state="active"] {
        border-color: transparent;
        background-color: transparent;
        box-shadow: none;
        &::after {
          opacity: 1;
        }
      }
      [data-slot="tabs-list"][data-variant="group"] & {
        border-color: var(--colors-border);
        border-radius: 0;
        background-color: var(--colors-background-paper);
        padding: 0 var(--spacing-3);
        color: var(--colors-text-primary);
        opacity: 1;
        &:hover {
          background-color: var(--colors-background-elementHover);
        }
        &:focus-visible {
          z-index: 2;
        }
        &[data-state="active"] {
          z-index: 1;
          border-color: var(--colors-primary);
          background-color: var(--colors-primary);
          color: var(--colors-foreground-primary);
          box-shadow: none;
        }
        &:disabled,
        &[aria-disabled="true"] {
          opacity: 0.5;
        }
        &[data-orientation="horizontal"] {
          &:not(:first-child) {
            margin-left: -1px;
          }
          &:first-child {
            border-top-left-radius: var(--radius-medium);
            border-bottom-left-radius: var(--radius-medium);
          }
          &:last-child {
            border-top-right-radius: var(--radius-medium);
            border-bottom-right-radius: var(--radius-medium);
          }
        }
        &[data-orientation="vertical"] {
          &:not(:first-child) {
            margin-top: -1px;
          }
          &:first-child {
            border-top-left-radius: var(--radius-medium);
            border-top-right-radius: var(--radius-medium);
          }
          &:last-child {
            border-bottom-left-radius: var(--radius-medium);
            border-bottom-right-radius: var(--radius-medium);
          }
        }
      }
      & svg {
        width: var(--spacing-4);
        height: var(--spacing-4);
        flex-shrink: 0;
        pointer-events: none;
      }
    }
  }
}
</style>
