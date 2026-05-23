<script lang="ts">
import { Portal } from '../Portal';
import { TooltipStore } from './store.svelte';
import type { TooltipProps } from './types';
import * as styles from './styles.css';

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
      class={[styles.content, contentClass]}
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
          class={[styles.arrow, arrowClass]}
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
