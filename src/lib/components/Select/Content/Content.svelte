<script lang="ts">
import { Select as SelectPrimitive } from 'bits-ui';
import type { ComponentProps } from 'svelte';
import type { WithoutChild, WithoutChildrenOrChild } from '../../../types.ts';
import { Portal } from '../Portal';
import { ScrollDownButton } from '../ScrollDownButton';
import { ScrollUpButton } from '../ScrollUpButton';

let {
  ref = $bindable(null),
  class: className,
  sideOffset = 4,
  portalProps,
  children,
  preventScroll = true,
  ...restProps
}: WithoutChild<SelectPrimitive.ContentProps> & {
  portalProps?: WithoutChildrenOrChild<ComponentProps<typeof Portal>>;
} = $props();
</script>

<Portal {...portalProps}>
  <SelectPrimitive.Content
    bind:ref
    {sideOffset}
    {preventScroll}
    data-slot="select-content"
    class={className}
    {...restProps}
  >
    <ScrollUpButton />
    <SelectPrimitive.Viewport data-slot="select-viewport">
      {@render children?.()}
    </SelectPrimitive.Viewport>
    <ScrollDownButton />
  </SelectPrimitive.Content>
</Portal>

<style>
@layer max-ts-svelte-components {
  :global {
    [data-slot="select-content"] {
      background-color: var(--colors-background-paper);
      color: var(--colors-text-primary);
      position: relative;
      z-index: 50;
      max-height: var(--bits-select-content-available-height);
      min-width: 8rem;
      overflow-x: hidden;
      overflow-y: auto;
      border-radius: var(--radius-medium);
      border: 1px solid var(--colors-border);
      box-shadow: var(--shadow-3);
      &[data-state="open"] {
        animation:
          fade-in 0.2s ease-out,
          zoom-in95 0.2s ease-out;
      }
      &[data-state="closed"] {
        animation:
          fade-out 0.2s ease-in,
          zoom-out95 0.2s ease-in;
      }
    }
    [data-slot="select-viewport"] {
      height: var(--bits-select-anchor-height);
      width: 100%;
      min-width: var(--bits-select-anchor-width);
      scroll-margin-top: var(--spacing-1);
      scroll-margin-bottom: var(--spacing-1);
      padding: var(--spacing-1);
    }
  }
  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes fade-out {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes zoom-in95 {
    0% {
      opacity: 0;
      transform: scale(0.95);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  @keyframes zoom-out95 {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(0.95);
    }
  }
}
</style>
