<script lang="ts">
import { Dialog as DialogPrimitive } from 'bits-ui';
import type { DrawerOverlayProps } from '../types';

let { class: className, ...restProps }: DrawerOverlayProps = $props();
</script>

<DialogPrimitive.Overlay
  data-slot="drawer-overlay"
  class={["overlay", className]}
  {...restProps}
/>

<style>
@layer max-ts-svelte-components {
  :global([data-slot="drawer-overlay"].overlay) {
    position: fixed;
    inset: 0;
    background-color: rgb(15 23 42 / 0.5);
    z-index: 50;
  }
  :global([data-slot="drawer-overlay"].overlay[data-state="open"]) {
    animation: fade-in 150ms ease-out;
  }
  :global([data-slot="drawer-overlay"].overlay[data-state="closed"]) {
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
}
</style>
