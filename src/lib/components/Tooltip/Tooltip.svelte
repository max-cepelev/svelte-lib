<script lang="ts">
import { Portal } from '../Portal';
import { TooltipStore } from './store.svelte';
import type { TooltipProps } from './types';

let {
  children,
  content,
  offset = 10,
  open,
  placement = 'top',
  arrow = false,
  arrowClass,
  contentClass,
  delayDuration = 100,
}: TooltipProps = $props();

const store = new TooltipStore({
  get placement() {
    return placement;
  },
  get offset() {
    return offset;
  },
  get open() {
    return open;
  },
  get delayDuration() {
    return delayDuration;
  },
});

const side = $derived(store.placement.split('-')[0]);

$effect(() => () => store.destroy());
</script>

<svelte:window
  onkeydown={(e) => e.key === 'Escape' && store.open && store.hide()}
/>

<span
  style="display: contents;"
  data-slot="tooltip-trigger"
  {@attach store.attachTrigger}
>
  {@render children?.()}
</span>

{#if store.visible && content != null && open !== false}
  <Portal>
    <!-- Keep the hover and positioning box independent of visual animations. -->
    <div
      class="positioner"
      role="presentation"
      data-slot="tooltip-positioner"
      data-state={store.open ? 'open' : 'closed'}
      data-side={side}
      data-placement={store.placement}
      style:position="fixed"
      style:top="{store.y}px"
      style:left="{store.x}px"
      {@attach store.attachContent}
    >
      <div
        id={store.tooltipId}
        role="tooltip"
        data-slot="tooltip-content"
        data-state={store.open ? 'open' : 'closed'}
        data-side={side}
        data-placement={store.placement}
        class={['content', contentClass]}
      >
        {#if typeof content === 'string'}
          {content}
        {:else}
          {@render content?.()}
        {/if}
        {#if arrow}
          <!-- biome-ignore lint/a11y/noSvgWithoutTitle: decorative -->
          <svg
            class={['arrow', arrowClass]}
            data-slot="tooltip-arrow"
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
    </div>
  </Portal>
{/if}

<style>
@layer max-ts-svelte-components {
  .positioner {
    z-index: 50;
    width: max-content;
  }
  .content {
    --tooltip-enter-x: 0px;
    --tooltip-enter-y: 0px;
    position: relative;
    box-sizing: border-box;
    background-color: var(--colors-background-tooltip);
    color: var(--colors-background-paper);
    border-radius: var(--radius-small);
    padding: var(--spacing-2);
    font-size: var(--fontSize-xs);
    font-weight: var(--fontWeight-semibold);
    text-align: center;
    width: fit-content;
    max-width: min(320px, calc(100vw - 32px));
    animation: tooltip-enter 150ms ease-out;
    white-space: normal;
    overflow-wrap: break-word;
    line-height: var(--lineHeight-none);
  }
  .content[data-side="bottom"] {
    --tooltip-enter-y: 8px;
  }
  .content[data-side="left"] {
    --tooltip-enter-x: -8px;
  }
  .content[data-side="right"] {
    --tooltip-enter-x: 8px;
  }
  .content[data-side="top"] {
    --tooltip-enter-y: -8px;
  }
  .content[data-state="closed"] {
    animation: tooltip-exit 150ms ease-out forwards;
  }
  .arrow {
    fill: var(--colors-background-tooltip);
    width: 14px;
    height: 8px;
    position: absolute;
    pointer-events: none;
  }
  .arrow[data-side="top"] {
    bottom: 1px;
    left: 50%;
    transform: translateX(-50%) translateY(100%);
  }
  .arrow[data-side="bottom"] {
    top: 1px;
    left: 50%;
    transform: translateX(-50%) translateY(-100%) rotate(180deg);
  }
  .arrow[data-side="left"] {
    right: 4px;
    top: 50%;
    transform: translateY(-50%) translateX(100%) rotate(-90deg);
  }
  .arrow[data-side="right"] {
    left: 4px;
    top: 50%;
    transform: translateY(-50%) translateX(-100%) rotate(90deg);
  }
  @keyframes tooltip-enter {
    0% {
      transform: translate(var(--tooltip-enter-x), var(--tooltip-enter-y));
      opacity: 0;
    }
    100% {
      transform: translate(0, 0);
      opacity: 1;
    }
  }
  @keyframes tooltip-exit {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(0.95);
      opacity: 0;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .content[data-state] {
      animation: none;
    }
    .content[data-state="closed"] {
      opacity: 0;
    }
  }
}
</style>
