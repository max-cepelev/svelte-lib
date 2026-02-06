<script lang="ts">
import styles from './styles.css';
import type { ItemProps } from './types';

let {
  ref = $bindable(null),
  class: className,
  child,
  variant = 'default',
  size = 'default',
  children,
  ...restProps
}: ItemProps = $props();

const mergedProps = $derived({
  class: [
    styles.item,
    styles.itemVariants[variant],
    styles.itemSizes[size],
    className,
  ],
  'data-slot': 'item',
  'data-variant': variant,
  'data-size': size,
  ...restProps,
});
</script>

{#if child}
  {@render child({ props: mergedProps })}
{:else}
  <div bind:this={ref} {...mergedProps}>{@render children?.()}</div>
{/if}
