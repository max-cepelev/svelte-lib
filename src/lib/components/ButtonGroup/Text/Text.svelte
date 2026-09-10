<script lang="ts">
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '../../../types.ts';

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
  class: ['button-group-text', className],
});
</script>

{#if child}
  {@render child({ props: mergedProps })}
{:else}
  <div bind:this={ref} {...mergedProps}>{@render children?.()}</div>
{/if}

<style>
:global(.button-group-text) {
  background-color: var(--colors-background-element);
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  border-radius: var(--radius-medium);
  border: 1px solid var(--colors-border);
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--fontSize-sm);
  font-weight: var(--fontWeight-medium);
  color: var(--colors-text-primary);
  box-shadow: var(--shadow-1);
}
:global(.button-group-text) :global(svg) {
  pointer-events: none;
}
:global(.button-group-text) :global(svg:not([class*="size-"])) {
  width: var(--spacing-4);
  height: var(--spacing-4);
}
</style>
