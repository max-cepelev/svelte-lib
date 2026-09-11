<script lang="ts">
import { Tooltip } from '../Tooltip';
import { Typography } from '../Typography';
import { OverflowTypographyStore } from './store.svelte';

import type { OverflowTypographyProps } from './types';

let {
  ref = $bindable(null),
  align = 'left',
  children,
  class: className,
  style,
  rowsCount = 1,
  text,
  tooltipProps = {
    arrow: true,
  },
  visibleLastSymbolsCount = 0,
  ...restProps
}: OverflowTypographyProps = $props();

const label = $derived(
  text ?? (typeof children === 'string' ? children : undefined),
);

const store = new OverflowTypographyStore({
  get text() {
    return label;
  },
  get rowsCount() {
    return rowsCount;
  },
  get visibleLastSymbolsCount() {
    return visibleLastSymbolsCount;
  },
});

const contentStyle = $derived(
  [style, `--rows-count: ${store.rowsCount}`].filter(Boolean).join('; '),
);
const tooltipContent = $derived(
  tooltipProps?.content ??
    (store.isOverflowed ? (label ?? children) : undefined),
);
const tooltipConfig = $derived({
  ...tooltipProps,
  content: tooltipContent,
  open: store.isOverflowed,
});

let cleanup: (() => void) | undefined;

$effect(() => {
  if (!ref) return;

  cleanup?.();
  cleanup = store.attach(ref);

  return () => {
    cleanup?.();
    cleanup = undefined;
  };
});

$effect(() => {
  label;
  rowsCount;
  visibleLastSymbolsCount;
  store.check();
});
</script>

{#snippet typography()}
  {#if store.hasVisibleLastSymbols}
    <div class="wrapper" data-align={align}>
      <Typography
        {...restProps}
        bind:ref
        {align}
        class="overflow-typography {className ?? ''}"
        component="span"
        display="block"
        {style}
      >
        {store.firstPartLabel}
      </Typography>
      <Typography
        {...restProps}
        {align}
        class={className}
        component="span"
        {style}
      >
        {store.secondPartLabel}
      </Typography>
    </div>
  {:else}
    <Typography
      {...restProps}
      bind:ref
      {align}
      class="overflow-typography {className ?? ''}"
      data-multiple-rows={store.hasMultipleRows || undefined}
      display="block"
      style={contentStyle}
    >
      {#if label}
        {label}
      {:else if typeof children === 'function'}
        {@render children()}
      {/if}
    </Typography>
  {/if}
{/snippet}

<Tooltip {...tooltipConfig}> {@render typography()} </Tooltip>

<style>
@layer max-ts-svelte-components {
  :global(.overflow-typography) {
    overflow: hidden;
    max-width: 100%;
    min-width: 0;
    text-overflow: ellipsis;
    white-space: nowrap;

    &[data-multiple-rows] {
      display: -webkit-box;
      white-space: initial;
      -webkit-box-orient: vertical;
      line-clamp: var(--rows-count);
      -webkit-line-clamp: var(--rows-count);
    }
  }
  .wrapper {
    display: flex;
    min-width: 0;
    width: 100%;
    white-space: nowrap;

    &[data-align="left"] {
      justify-content: flex-start;
    }
    &[data-align="center"] {
      justify-content: center;
    }
    &[data-align="right"] {
      justify-content: flex-end;
    }
    &[data-align="justify"] {
      justify-content: space-between;
    }
  }
}
</style>
