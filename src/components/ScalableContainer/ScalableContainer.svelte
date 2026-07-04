<script lang="ts">
import { RotateCcw, ZoomIn, ZoomOut } from '@lucide/svelte';
import { on } from 'svelte/events';
import styles from './styles.css';

import type { ScalableContainerProps } from './types';
import { ButtonGroup } from '../ButtonGroup';
import { ScalableContainerStore } from './store.svelte';
import { Button } from '../Button';

let {
  initialScale = 1,
  minScale = 0.1,
  maxScale = 4,
  showToolbar = false,
  class: className,
  onScaleChanged,
  onPositionChanged,
  children,
  ...restProps
}: ScalableContainerProps = $props();

let viewportElement = $state<HTMLDivElement>();
let contentElement = $state<HTMLDivElement>();

const store = new ScalableContainerStore({
  get initialScale() {
    return initialScale;
  },
  get minScale() {
    return minScale;
  },
  get maxScale() {
    return maxScale;
  },
  get onScaleChanged() {
    return onScaleChanged;
  },
  get onPositionChanged() {
    return onPositionChanged;
  },
});
function shouldSkipDragStart(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest(
      'button, a, input, textarea, select, label, path, circle, ellipse, polygon, polyline, line, summary, [role="button"], [contenteditable="true"], [data-scalable-container-interactive]',
    ),
  );
}

function onpointerdown(e: PointerEvent): void {
  if (e.pointerType === 'mouse') {
    if (e.button !== 0) return;
    if (shouldSkipDragStart(e.target)) return;
  }

  store.startDrag(e.pointerId, e.clientX, e.clientY);
}

function onpointermove(e: PointerEvent): void {
  const startedDragging = store.moveDrag(e.pointerId, e.clientX, e.clientY);

  if (startedDragging) {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }
}

function onpointerup(e: PointerEvent): void {
  store.endDrag(e.pointerId);
}

function onclickcapture(e: MouseEvent): void {
  if (!store.consumeClickAfterDrag()) return;

  e.preventDefault();
  e.stopPropagation();
}

function ontouchstart(e: TouchEvent): void {
  if (e.touches.length === 2) {
    store.startPinch(e.touches[0], e.touches[1]);
  }
}

function ontouchmove(e: TouchEvent): void {
  if (e.touches.length === 2) {
    e.preventDefault();
    store.movePinch(e.touches[0], e.touches[1]);
  }
}

function ontouchend(): void {
  store.endPinch();
}

function onwheel(e: WheelEvent): void {
  const metaKey = e.metaKey || e.ctrlKey;

  if (metaKey) {
    e.preventDefault();
  }
  store.wheel(e.deltaY, metaKey);
}

$effect(() => {
  if (!viewportElement || !contentElement) return;

  const unlistenWheel = on(viewportElement, 'wheel', onwheel, {
    passive: false,
  });
  const unlistenTouchStart = on(contentElement, 'touchstart', ontouchstart, {
    passive: false,
  });
  const unlistenTouchMove = on(contentElement, 'touchmove', ontouchmove, {
    passive: false,
  });
  const unlistenTouchEnd = on(contentElement, 'touchend', ontouchend);
  const unlistenTouchCancel = on(contentElement, 'touchcancel', ontouchend);

  return () => {
    unlistenWheel();
    unlistenTouchStart();
    unlistenTouchMove();
    unlistenTouchEnd();
    unlistenTouchCancel();
  };
});

$effect(() => () => store.destroy());
</script>

<div
  bind:this={viewportElement}
  class={[styles.viewport, className]}
  style:cursor={store.cursor}
  {...restProps}
>
  {#if showToolbar}
    <ButtonGroup.Root orientation="vertical" class={styles.toolbar}>
      <Button
        onclick={store.zoomIn}
        size="iconSmall"
        title="Увеличить"
        variant="outline"
      >
        <ZoomIn />
      </Button>
      <Button
        onclick={store.zoomOut}
        size="iconSmall"
        title="Уменьшить"
        variant="outline"
      >
        <ZoomOut />
      </Button>
      <Button
        onclick={store.reset}
        size="iconSmall"
        title="Сбросить"
        variant="outline"
      >
        <RotateCcw />
      </Button>
    </ButtonGroup.Root>
  {/if}
  <div class={styles.overlay} data-visible={store.showOverlay}>
    Используйте {store.meta} + колесо для масштабирования.
  </div>
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    bind:this={contentElement}
    class={styles.contentWrapper}
    style:transform={store.transform}
    style:transition={store.transition}
    {onclickcapture}
    {onpointerdown}
    {onpointermove}
    {onpointerup}
    onpointercancel={onpointerup}
  >
    {@render children?.()}
  </div>
</div>
