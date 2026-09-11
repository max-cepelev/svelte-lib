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
    <div
      id={store.tooltipId}
      role="tooltip"
      data-slot="tooltip-content"
      data-state={store.open ? 'open' : 'closed'}
      data-side={store.placement}
      class={["content", contentClass]}
      style:position="fixed"
      style:top="{store.y}px"
      style:left="{store.x}px"
      onmouseenter={store.keepOpen}
      onmouseleave={store.hide}
      {@attach store.attachContent}
    >
      {#if typeof content === 'string'}
        {content}
      {:else}
        {@render content?.()}
      {/if}
      {#if arrow}
        <!-- biome-ignore lint/a11y/noSvgWithoutTitle: decorative -->
        <svg
          class={["arrow", arrowClass]}
          data-side={store.placement}
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

<style>
@layer max-ts-svelte-components {
  .content {
    z-index: 50;
    background-color: var(--colors-background-tooltip);
    color: var(--colors-background-paper);
    border-radius: var(--radius-small);
    padding: var(--spacing-2);
    font-size: var(--fontSize-xs);
    font-weight: var(--fontWeight-semibold);
    text-align: center;
    width: fit-content;
    max-width: min(320px, calc(100vw - 32px));
    animation:
      fade-in 150ms ease-out,
      zoom-in 150ms ease-out;
    white-space: normal;
    overflow-wrap: break-word;
    line-height: var(--lineHeight-none);
  }
  .content[data-state="closed"] {
    animation:
      fade-out 150ms ease-out,
      zoom-out 150ms ease-out;
  }
  .content[data-side="bottom"] {
    animation:
      fade-in 150ms ease-out,
      slide-in-from-top 150ms ease-out;
  }
  .content[data-side="left"] {
    animation:
      fade-in 150ms ease-out,
      slide-in-from-end 150ms ease-out;
  }
  .content[data-side="right"] {
    animation:
      fade-in 150ms ease-out,
      slide-in-from-start 150ms ease-out;
  }
  .content[data-side="top"] {
    animation:
      fade-in 150ms ease-out,
      slide-in-from-bottom 150ms ease-out;
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
  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes fade-out {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes zoom-in {
    0% {
      transform: scale(0.95);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  @keyframes zoom-out {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(0.95);
      opacity: 0;
    }
  }
  @keyframes slide-in-from-top {
    0% {
      transform: translateY(8px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
  @keyframes slide-in-from-bottom {
    0% {
      transform: translateY(-8px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
  @keyframes slide-in-from-end {
    0% {
      transform: translateX(-8px);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slide-in-from-start {
    0% {
      transform: translateX(8px);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
}
</style>
