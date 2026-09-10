<script lang="ts">
import { Dialog as DialogPrimitive } from 'bits-ui';
import type { DialogOverlayProps } from '../types';

let {
  ref = $bindable(null),
  class: className,
  ...restProps
}: DialogOverlayProps = $props();

const classNames = $derived(['overlay', className]);
</script>

<DialogPrimitive.Overlay
  bind:ref
  data-slot="dialog-overlay"
  class={classNames}
  {...restProps}
/>

<style>
:global([data-slot="dialog-overlay"].overlay) {
  position: fixed;
  inset: 0;
  background-color: rgb(15 23 42 / 0.5);
  z-index: 50;
}
:global([data-slot="dialog-overlay"].overlay[data-state="open"]) {
  animation: fade-in 150ms ease-out;
}
:global([data-slot="dialog-overlay"].overlay[data-state="closed"]) {
  animation: fade-out 150ms ease-in;
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
</style>
