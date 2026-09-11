<script lang="ts">
import type { InputGroupTextProps } from '../types';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: InputGroupTextProps = $props();

const classNames = $derived(['text', className]);
</script>

<span bind:this={ref} class={classNames} {...restProps}>
  {@render children?.()}
</span>

<style>
@layer max-ts-svelte-components {
  .text {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-2);
    color: var(--colors-text-hint);
    font-size: var(--fontSize-sm);
  }
  .text :global(svg) {
    pointer-events: none;
  }
  .text :global(svg:not([class*="size-"])) {
    width: 1rem;
    height: 1rem;
  }
}
</style>
