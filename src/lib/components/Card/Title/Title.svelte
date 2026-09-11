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
  data-slot="card-title"
  class={["title", className]}
  {...restProps}
>
  {@render children?.()}
</div>

<style>
@layer max-ts-svelte-components {
  .title {
    line-height: var(--lineHeight-none);
    font-weight: var(--fontWeight-semibold);
    font-size: var(--fontSize-base);
  }
}
</style>
