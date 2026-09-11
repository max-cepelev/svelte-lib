<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '../../../types.ts';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: WithElementRef<HTMLAttributes<HTMLElement>> = $props();
</script>

<nav {...restProps} bind:this={ref} class={["nav", className]}>
  {@render children?.()}
</nav>

<style>
@layer max-ts-svelte-components {
  .nav {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-1);
  }
}
</style>
