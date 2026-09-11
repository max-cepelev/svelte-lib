<script lang="ts">
import { Dialog as DialogPrimitive } from 'bits-ui';
import XIcon from '@lucide/svelte/icons/x';
import type { DrawerContentProps } from '../types';
import { Overlay } from '../Overlay';
import { Portal } from '../Portal';
import { getDrawerContext } from '../context';

const drawer = getDrawerContext();
const isNotCloseable = $derived(drawer.isNotCloseable());

let {
  class: className,
  portalProps,
  showCloseButton,
  children,
  swipeCloseThreshold = 50,
  ...restProps
}: DrawerContentProps = $props();

let isDragging = $state<boolean>(false);
let pointerId = $state<number | undefined>(undefined);
let startPosition = $state<number | undefined>(undefined);
let position = $state<number | undefined>(undefined);
const style = $derived(
  position !== undefined
    ? { transform: `translateY(${position}px)` }
    : undefined,
);

function handlePointerDown(event: PointerEvent) {
  if (event.pointerType === 'mouse' && event.button !== 0) return;
  if (pointerId !== undefined) return;

  isDragging = true;
  pointerId = event.pointerId;
  startPosition = event.clientY;
  (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
}

function handlePointerMove(event: PointerEvent) {
  if (event.pointerId !== pointerId || startPosition === undefined) return;
  position = Math.max(0, event.clientY - startPosition);
}

function resetGesture() {
  isDragging = false;
  pointerId = undefined;
  startPosition = undefined;
  position = undefined;
}

function handlePointerEnd(event: PointerEvent) {
  if (event.pointerId !== pointerId) return;

  const shouldClose = (position ?? 0) > swipeCloseThreshold;
  resetGesture();

  if (shouldClose) drawer.close();
}

function handlePointerCancel(event: PointerEvent) {
  if (event.pointerId !== pointerId) return;
  resetGesture();
}
</script>

<Portal {...portalProps}>
  <Overlay />
  <DialogPrimitive.Content
    data-slot="drawer-content"
    class={["content", {
      'content-transition': !isDragging
    }, className]}
    {style}
    {...restProps}
  >
    {#if !isNotCloseable && !showCloseButton}
      <div
        onpointerdown={handlePointerDown}
        onpointermove={handlePointerMove}
        onpointerup={handlePointerEnd}
        onpointercancel={handlePointerCancel}
        onlostpointercapture={handlePointerCancel}
        class="handle"
        aria-hidden="true"
      ></div>
    {/if}
    {@render children?.()}
    {#if !isNotCloseable && showCloseButton}
      <DialogPrimitive.Close class="drawer-content-close-button">
        <XIcon />
        <span class="visually-hidden">Close drawer</span>
      </DialogPrimitive.Close>
    {/if}
  </DialogPrimitive.Content>
</Portal>

<style>
@layer max-ts-svelte-components {
  :global([data-slot="drawer-content"].content) {
    position: fixed;
    display: flex;
    flex-direction: column;
    background-color: var(--colors-background-paper);
    color: var(--colors-text-primary);
    border: 1px solid var(--colors-border);
    box-shadow: var(--shadow-4);
    z-index: 51;
    width: 100%;
    max-width: 100%;
    max-height: 100%;
    overscroll-behavior-y: contain;
    inset: auto 0 0 0;
    border-radius: var(--radius-large) var(--radius-large) 0 0;
  }
  :global([data-slot="drawer-content"].content[data-state="open"]) {
    animation: slide-in 220ms ease-out;
  }
  :global([data-slot="drawer-content"].content[data-state="closed"]) {
    transform: translateY(100%);
  }
  :global([data-slot="drawer-content"].content-transition) {
    transition: transform 210ms ease-in-out;
  }
  :global(.drawer-content-close-button) {
    position: absolute;
    top: var(--spacing-2);
    right: var(--spacing-2);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: transparent;
    color: var(--colors-text-secondary);
    padding: var(--spacing-1);
    border-radius: var(--radius-small);
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.2s ease;
  }
  :global(.drawer-content-close-button:hover) {
    opacity: 1;
  }
  :global(.drawer-content-close-button:focus-visible) {
    outline: 2px solid var(--colors-primary);
    outline-offset: 2px;
  }
  .handle {
    width: 100%;
    height: var(--spacing-8);
    display: flex;
    justify-content: center;
    align-items: center;
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
  }
  .handle::after {
    content: "";
    width: 100px;
    height: 8px;
    border-radius: var(--radius-medium);
    background-color: var(--colors-background-element);
  }
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  @keyframes slide-in {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
}
</style>
