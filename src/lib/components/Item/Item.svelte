<script lang="ts">
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
  class: className,
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

<style>
@layer max-ts-svelte-components {
  :global {
    [data-slot="item"] {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      border-radius: var(--radius-medium);
      border: 1px solid transparent;
      font-size: var(--fontSize-sm);
      transition:
        background-color 0.1s,
        border-color 0.1s,
        box-shadow 0.1s;
      outline: none;
      position: relative;
      &:focus-visible {
        border-color: var(--colors-primary);
        box-shadow: 0 0 0 3px
          color-mix(in oklch, var(--colors-primary) 20%, transparent);
      }
      &[href]:hover {
        background-color: color-mix(
          in oklch,
          var(--colors-background-elementHover) 50%,
          transparent
        );
      }
      &[data-variant="default"] {
        background-color: transparent;
      }
      &[data-variant="outline"] {
        border-color: var(--colors-border);
      }
      &[data-variant="muted"] {
        background-color: color-mix(
          in oklch,
          var(--colors-background-element) 50%,
          transparent
        );
      }
      &[data-size="default"] {
        gap: var(--spacing-4);
        padding: var(--spacing-4);
      }
      &[data-size="small"] {
        gap: var(--spacing-2);
        padding: var(--spacing-3) var(--spacing-4);
      }
      &:has([data-slot="item-description"]) [data-slot="item-media"] {
        transform: translateY(2px);
        align-self: flex-start;
      }
    }
  }
}
</style>
