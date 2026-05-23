<script lang="ts">
import { Tooltip } from '../Tooltip';
import { Typography } from '../Typography';
import { OverflowTypographyStore } from './store.svelte';
import * as styles from './styles.css';
import type { OverflowTypographyProps } from './types';

let {
  ref = $bindable(null),
  align = 'left',
  children,
  class: className,
  style,
  rowsCount = 1,
  text,
  tooltipProps,
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

const joinClasses = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(' ');

const wrapperClass = $derived(
  joinClasses(styles.wrapper, styles.wrapperAlignments[align]),
);
const truncateClass = $derived(joinClasses(styles.truncate, className));
const contentClass = $derived(
  joinClasses(
    styles.truncate,
    store.hasMultipleRows && styles.multipleRows,
    className,
  ),
);
const contentStyle = $derived(
  [style, `--rows-count: ${store.rowsCount}`].filter(Boolean).join('; '),
);
const tooltipContent = $derived(
  tooltipProps?.content ?? (store.isOverflowed ? label : undefined),
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
    <div class={wrapperClass}>
      <Typography
        {...restProps}
        bind:ref
        {align}
        class={truncateClass}
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
      class={contentClass}
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
