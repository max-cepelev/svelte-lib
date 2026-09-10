<script lang="ts">
import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
import type { ComponentProps } from 'svelte';
import type { WithoutChildrenOrChild } from '../../../types.ts';
import { Portal } from '../Portal';

let {
  ref = $bindable(null),
  sideOffset = 4,
  portalProps,
  class: className,
  ...restProps
}: DropdownMenuPrimitive.ContentProps & {
  portalProps?: WithoutChildrenOrChild<ComponentProps<typeof Portal>>;
} = $props();
</script>

<Portal {...portalProps}>
  <DropdownMenuPrimitive.Content
    bind:ref
    data-slot="dropdown-menu-content"
    {sideOffset}
    class={["content", className]}
    {...restProps}
  />
</Portal>

<style>
:global([data-slot="dropdown-menu-content"].content) {
  z-index: 50;
  background-color: var(--colors-background-paper);
  color: var(--colors-text-primary);
  max-height: var(--bits-dropdown-menu-content-available-height);
  min-width: 8rem;
  transform-origin: var(--bits-dropdown-menu-content-transform-origin);
  overflow-x: hidden;
  overflow-y: auto;
  border-radius: var(--radius-medium);
  border: 1px solid var(--colors-border);
  padding: var(--spacing-1);
  box-shadow: var(--shadow-4);
  outline: none;
}
:global([data-slot="dropdown-menu-content"].content[data-state="open"]) {
  animation:
    fade-in 150ms ease-out,
    zoom-in95 150ms ease-out;
}
:global([data-slot="dropdown-menu-content"].content[data-state="closed"]) {
  animation:
    fade-out 150ms ease-in,
    zoom-out95 150ms ease-in;
}
:global([data-slot="dropdown-menu-content"].content[data-side="bottom"]) {
  animation: slide-from-top 150ms ease-out;
}
:global([data-slot="dropdown-menu-content"].content[data-side="top"]) {
  animation: slide-from-bottom 150ms ease-out;
}
:global([data-slot="dropdown-menu-content"].content[data-side="left"]) {
  animation: slide-from-end 150ms ease-out;
}
:global([data-slot="dropdown-menu-content"].content[data-side="right"]) {
  animation: slide-from-start 150ms ease-out;
}
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes zoom-in95 {
  from {
    transform: scale(0.95);
  }
  to {
    transform: scale(1);
  }
}
@keyframes zoom-out95 {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0.95);
  }
}
@keyframes slide-from-top {
  from {
    transform: translateY(-0.5rem);
  }
  to {
    transform: translateY(0);
  }
}
@keyframes slide-from-bottom {
  from {
    transform: translateY(0.5rem);
  }
  to {
    transform: translateY(0);
  }
}
@keyframes slide-from-start {
  from {
    transform: translateX(-0.5rem);
  }
  to {
    transform: translateX(0);
  }
}
@keyframes slide-from-end {
  from {
    transform: translateX(0.5rem);
  }
  to {
    transform: translateX(0);
  }
}
</style>
