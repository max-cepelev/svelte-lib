<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '../../../types.ts';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
  bind:this={ref}
  data-slot="item-title"
  class={["title", className]}
  {...restProps}
>
  {@render children?.()}
</div>

<style>
@layer max-ts-svelte-components {
  .title {
    display: flex;
    width: fit-content;
    align-items: center;
    gap: var(--spacing-2);
    font-size: var(--fontSize-sm);
    line-height: var(--lineHeight-snug);
    font-weight: var(--fontWeight-medium);
  }
}
</style>
