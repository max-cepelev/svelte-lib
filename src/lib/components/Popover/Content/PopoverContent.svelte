<script lang="ts">
import { Popover as PopoverPrimitive } from 'bits-ui';
import PopoverPortal from '../Portal/PopoverPortal.svelte';

import type { PopoverContentProps } from '../types';

let {
  ref = $bindable(null),
  class: className,
  sideOffset = 4,
  align = 'center',
  portalProps,
  children,
  ...restProps
}: PopoverContentProps = $props();
</script>

<PopoverPortal {...portalProps}>
  <PopoverPrimitive.Content
    bind:ref
    data-slot="popover-content"
    {sideOffset}
    {align}
    class={["content", className]}
    {...restProps}
  >
    {@render children?.()}
  </PopoverPrimitive.Content>
</PopoverPortal>

<style>
@layer max-ts-svelte-components {
  :global([data-slot="popover-content"].content) {
    background-color: var(--colors-background-paper);
    color: var(--colors-text-primary);
    z-index: 50;
    width: 18rem;
    border-radius: var(--radius-medium);
    border: 1px solid var(--colors-border);
    padding: var(--spacing-4);
    box-shadow: var(--shadow-2);
    outline: none;
    transform-origin: var(--bits-popover-content-transform-origin);
  }
  :global([data-slot="popover-content"].content[data-state="open"]) {
    animation: zoom-in 0.15s ease-out;
  }
  :global([data-slot="popover-content"].content[data-state="closed"]) {
    animation: zoom-out 0.1s ease-in;
  }
  @keyframes zoom-in {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  @keyframes zoom-out {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.95);
    }
  }
}
</style>
