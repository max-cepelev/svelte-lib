<script lang="ts">
import { Dialog as DialogPrimitive } from 'bits-ui';
import { getDrawerContext } from '../context';
import type { DrawerOverlayProps } from '../types';
import styles from '../styles.css';

const drawer = getDrawerContext();

let { class: className, onclick, ...restProps }: DrawerOverlayProps = $props();

function handleClick(event: MouseEvent) {
  onclick?.(event as never);
  if (event?.defaultPrevented) return;
  if (drawer?.isNotCloseable()) return;
  drawer?.close();
}
</script>

<DialogPrimitive.Overlay
  data-slot="drawer-overlay"
  class={[styles.overlay, className]}
  onclick={handleClick}
  {...restProps}
/>
