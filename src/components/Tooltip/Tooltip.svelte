<script lang="ts" module>
let activeDismiss: (() => void) | null = null;
</script>

<script lang="ts">
import { tick, untrack } from 'svelte';
import { Portal } from '../Portal';
import type { TooltipProps } from './types';
import styles from './styles.css';

const ANIMATION_DURATION = 150;

let {
  open = $bindable(false),
  children,
  content,
  class: className,
  alignOffset = 0,
  sideOffset = 10,
  side = 'top',
  align = 'center',
  arrow = false,
  arrowClass,
  delayDuration = 200,
}: TooltipProps = $props();

let triggerEl: HTMLElement | undefined;
let contentEl: HTMLElement | undefined = $state();
let visible = $state(false);
let delayTimer: ReturnType<typeof setTimeout> | undefined;
let closeTimer: ReturnType<typeof setTimeout> | undefined;
let position = $state.raw({ top: 0, left: 0 });

const tooltipId = `tooltip-${Math.random().toString(36).slice(2, 11)}`;

function updatePosition() {
  if (!triggerEl || !contentEl) return;

  const triggerRect = triggerEl.getBoundingClientRect();
  const contentRect = contentEl.getBoundingClientRect();
  let top = 0;
  let left = 0;

  switch (side) {
    case 'top':
      top = triggerRect.top - contentRect.height - sideOffset;
      left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
      break;
    case 'bottom':
      top = triggerRect.bottom + sideOffset;
      left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
      break;
    case 'left':
      top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;
      left = triggerRect.left - contentRect.width - sideOffset;
      break;
    case 'right':
      top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;
      left = triggerRect.right + sideOffset;
      break;
  }

  if (side === 'top' || side === 'bottom') {
    if (align === 'start') left = triggerRect.left + alignOffset;
    else if (align === 'end')
      left = triggerRect.right - contentRect.width - alignOffset;
    else left += alignOffset;
  } else {
    if (align === 'start') top = triggerRect.top + alignOffset;
    else if (align === 'end')
      top = triggerRect.bottom - contentRect.height - alignOffset;
    else top += alignOffset;
  }

  position = { top, left };
}

function dismiss() {
  clearTimeout(delayTimer);
  clearTimeout(closeTimer);
  if (activeDismiss === dismiss) activeDismiss = null;
  open = false;
  visible = false;
}

function show() {
  if (activeDismiss && activeDismiss !== dismiss) {
    activeDismiss();
  }
  clearTimeout(closeTimer);
  clearTimeout(delayTimer);
  activeDismiss = dismiss;
  delayTimer = setTimeout(() => {
    open = true;
  }, delayDuration);
}

function hide() {
  clearTimeout(delayTimer);
  if (activeDismiss === dismiss) activeDismiss = null;
  open = false;
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && open) {
    hide();
  }
}

// React to open state changes (internal or external)
$effect(() => {
  if (open) {
    clearTimeout(closeTimer);
    visible = true;
    tick().then(updatePosition);
  } else if (untrack(() => visible)) {
    closeTimer = setTimeout(() => {
      visible = false;
    }, ANIMATION_DURATION);
  }
});

// Reposition on scroll/resize while open
$effect(() => {
  if (!open) return;

  window.addEventListener('scroll', updatePosition, true);
  window.addEventListener('resize', updatePosition);

  return () => {
    window.removeEventListener('scroll', updatePosition, true);
    window.removeEventListener('resize', updatePosition);
  };
});

// Cleanup on unmount
$effect(() => {
  return () => dismiss();
});

function attachTrigger(node: HTMLElement) {
  const el = node.firstElementChild as HTMLElement | null;
  if (!el) return;
  triggerEl = el;

  el.addEventListener('mouseenter', show);
  el.addEventListener('mouseleave', hide);
  el.addEventListener('focusin', show);
  el.addEventListener('focusout', hide);
  el.setAttribute('aria-describedby', tooltipId);

  return () => {
    el.removeEventListener('mouseenter', show);
    el.removeEventListener('mouseleave', hide);
    el.removeEventListener('focusin', show);
    el.removeEventListener('focusout', hide);
    el.removeAttribute('aria-describedby');
    triggerEl = undefined;
  };
}
</script>

<svelte:window onkeydown={handleKeydown} />

<span
  style="display: contents;"
  data-slot="tooltip-trigger"
  {@attach attachTrigger}
>
  {@render children?.()}
</span>

{#if visible}
  <Portal>
    <div
      bind:this={contentEl}
      id={tooltipId}
      role="tooltip"
      data-slot="tooltip-content"
      data-state={open ? 'open' : 'closed'}
      data-side={side}
      class={[styles.content, className]}
      style:position="fixed"
      style:top="{position.top}px"
      style:left="{position.left}px"
      onmouseenter={show}
      onmouseleave={hide}
    >
      {#if typeof content === 'string'}
        {content}
      {:else}
        {@render content?.()}
      {/if}
      {#if arrow}
        <!-- biome-ignore lint/a11y/noSvgWithoutTitle: decorative -->
        <svg
          class={[styles.arrow, arrowClass]}
          data-side={side}
          viewBox="0 0 7.68 4.35"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m 0.52372243,0.10910656 c -0.1676883,0 -0.3188698,0.10099765 -0.38304509,0.25594925 -0.0641698,0.1548964 -0.0287017,0.3332318 0.0898753,0.4518088 L 3.5473966,4.1337031 c 0.077725,0.07778 0.1832001,0.1214516 0.2931533,0.1214516 0.1099531,0 0.2154286,-0.043672 0.2932085,-0.1214516 L 7.4505968,0.81686461 c 0.118577,-0.118577 0.1540119,-0.2969124 0.089831,-0.4518088 C 7.476247,0.21010421 7.3251098,0.10910656 7.1573882,0.10910656 Z"
            fill="inherit"
          />
        </svg>
      {/if}
    </div>
  </Portal>
{/if}
