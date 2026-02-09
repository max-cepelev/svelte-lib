<script lang="ts">
import { Dialog as DialogPrimitive } from 'bits-ui';
import XIcon from '@lucide/svelte/icons/x';
import DialogOverlay from '../Overlay/Overlay.svelte';
import DialogPortal from '../Portal/Portal.svelte';
import type { DialogContentProps } from '../types';
import {
  closeButton,
  content as contentStyle,
  visuallyHidden,
} from '../styles.css';

let {
  ref = $bindable(null),
  class: className,
  portalProps,
  showCloseButton = true,
  children,
  ...restProps
}: DialogContentProps = $props();

const classNames = $derived([contentStyle, className]);
</script>

<DialogPortal {...portalProps}>
  <DialogOverlay />
  <DialogPrimitive.Content
    bind:ref
    data-slot="dialog-content"
    class={classNames}
    {...restProps}
  >
    {@render children?.()}
    {#if showCloseButton}
      <DialogPrimitive.Close class={closeButton}>
        <XIcon />
        <span class={visuallyHidden}>Close dialog</span>
      </DialogPrimitive.Close>
    {/if}
  </DialogPrimitive.Content>
</DialogPortal>
