<script lang="ts">
import { Dialog as DialogPrimitive } from 'bits-ui';
import XIcon from '@lucide/svelte/icons/x';
import DialogOverlay from '../Overlay/Overlay.svelte';
import DialogPortal from '../Portal/Portal.svelte';
import type { DialogContentProps } from '../types';

let {
  ref = $bindable(null),
  class: className,
  portalProps,
  showCloseButton = true,
  children,
  ...restProps
}: DialogContentProps = $props();
</script>

<DialogPortal {...portalProps}>
  <DialogOverlay />
  <DialogPrimitive.Content
    bind:ref
    data-slot="dialog-content"
    class={className}
    {...restProps}
  >
    {@render children?.()}
    {#if showCloseButton}
      <DialogPrimitive.Close data-slot="dialog-content-close" type="button">
        <XIcon />
        <span class="visually-hidden">Close dialog</span>
      </DialogPrimitive.Close>
    {/if}
  </DialogPrimitive.Content>
</DialogPortal>

<style>
@layer max-ts-svelte-components {
  :global {
    [data-slot="dialog-content"] {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 51;
      display: grid;
      gap: var(--spacing-4);
      width: calc(100% - 2rem);
      max-height: min(90vh, 48rem);
      background-color: var(--colors-background-paper);
      color: var(--colors-text-primary);
      border-radius: var(--radius-large);
      border: 1px solid var(--colors-border);
      box-shadow: var(--shadow-4);
      padding: var(--spacing-6);
      outline: none;
      &[data-state="open"] {
        animation: scale-in 200ms ease-out;
      }
      &[data-state="closed"] {
        animation: scale-out 150ms ease-in;
      }
      @media screen and (min-width: 640px) {
        width: 32rem;
      }
    }
    [data-slot="dialog-content-close"] {
      position: absolute;
      top: var(--spacing-4);
      right: var(--spacing-4);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: none;
      border-radius: var(--radius-small);
      background-color: transparent;
      color: var(--colors-text-secondary);
      opacity: 0.7;
      cursor: pointer;
      padding: var(--spacing-1);
      transition: opacity 0.2s ease;
      &:hover {
        opacity: 1;
      }
      &:focus-visible {
        outline: 2px solid var(--colors-primary);
        outline-offset: 2px;
      }
      &:disabled {
        opacity: 0.5;
        pointer-events: none;
      }
    }
  }
  .visually-hidden {
    border: 0;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    white-space: nowrap;
  }
  @keyframes scale-in {
    from {
      opacity: 0;
      transform: translate(-50%, -48%) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
  @keyframes scale-out {
    from {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
    to {
      opacity: 0;
      transform: translate(-50%, -48%) scale(0.95);
    }
  }
}
</style>
