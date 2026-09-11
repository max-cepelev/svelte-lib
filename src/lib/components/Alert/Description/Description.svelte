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
  data-slot="alert-description"
  class={["description", className]}
  {...restProps}
>
  {@render children?.()}
</div>

<style>
@layer max-ts-svelte-components {
  .description {
    grid-area: description;
    display: grid;
    justify-items: start;
    gap: var(--spacing-1);
    font-size: var(--fontSize-sm);
    opacity: 0.8;
  }
  .description :global(p) {
    line-height: var(--lineHeight-relaxed);
  }
}
</style>
