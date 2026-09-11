<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '../../../types.ts';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: WithElementRef<HTMLAttributes<HTMLSpanElement>> = $props();
</script>

<span
  bind:this={ref}
  data-slot="dropdown-menu-shortcut"
  class={["shortcut", className]}
  {...restProps}
>
  {@render children?.()}
</span>

<style>
@layer max-ts-svelte-components {
  .shortcut {
    color: var(--colors-text-secondary);
    margin-inline-start: auto;
    font-size: var(--fontSize-xs);
    letter-spacing: 0.1em;
  }
}
</style>
