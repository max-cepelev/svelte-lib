<script lang="ts">
import { Dialog as DialogPrimitive } from 'bits-ui';
import XIcon from '@lucide/svelte/icons/x';
import type { DrawerContentProps } from '../types';
import { Overlay } from '../Overlay';
import { Portal } from '../Portal';
import { getDrawerContext } from '../context';
import styles from '../styles.css';

const drawer = getDrawerContext();
const isNotCloseable = drawer.isNotCloseable();

let {
  class: className,
  portalProps,
  showCloseButton,
  children,
  swipeCloseThreshold = 50,
  ...restProps
}: DrawerContentProps = $props();

let isDragging = $state<boolean>(false);
let startPosition = $state<number | undefined>(undefined);
let position = $state<number | undefined>(undefined);
const style = $derived(
  position ? { transform: `translateY(${position}px)` } : undefined,
);

function handleTouchStart(event: TouchEvent) {
  isDragging = true;
  startPosition = event.touches[0]?.clientY ?? null;
}

function handleTouchMove(event: TouchEvent) {
  const clientY = event.touches[0]?.clientY ?? position;
  if (startPosition && clientY > startPosition) {
    position = clientY - startPosition;
  }
}

function handleTouchEnd() {
  isDragging = false;
  if (
    position &&
    startPosition &&
    position - startPosition > swipeCloseThreshold
  ) {
    drawer?.close();
  }

  startPosition = undefined;
  position = undefined;
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
        ontouchmove={handleTouchMove}
        ontouchstart={handleTouchStart}
        ontouchend={handleTouchEnd}
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
