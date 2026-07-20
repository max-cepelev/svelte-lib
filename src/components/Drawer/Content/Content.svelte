<script lang="ts">
import { Dialog as DialogPrimitive } from 'bits-ui';
import XIcon from '@lucide/svelte/icons/x';
import type { DrawerContentProps } from '../types';
import { Overlay } from '../Overlay';
import { Portal } from '../Portal';
import { getDrawerContext } from '../context';
import * as styles from '../styles.css';

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
    class={[styles.content, {
      [styles.contentTransition]: !isDragging
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
        class={styles.handle}
        aria-hidden="true"
      ></div>
    {/if}
    {@render children?.()}
    {#if !isNotCloseable && showCloseButton}
      <DialogPrimitive.Close class={styles.closeButton}>
        <XIcon />
        <span class={styles.visuallyHidden}>Close drawer</span>
      </DialogPrimitive.Close>
    {/if}
  </DialogPrimitive.Content>
</Portal>
