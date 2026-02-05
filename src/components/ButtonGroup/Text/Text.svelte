<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements';
import type { Snippet } from 'svelte';
import type { WithElementRef } from '../../../types.js';
import styles from './styles.css.js';

let {
  ref = $bindable(null),
  class: className,
  child,
  children,
  ...restProps
}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
  child?: Snippet<[{ props: Record<string, unknown> }]>;
} = $props();

const mergedProps = $derived({
  ...restProps,
  class: [styles.text, className],
});
</script>

{#if child}
  {@render child({ props: mergedProps })}
{:else}
  <div bind:this={ref} {...mergedProps}>{@render children?.()}</div>
{/if}
