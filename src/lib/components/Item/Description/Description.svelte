<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '../../../types.ts';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: WithElementRef<HTMLAttributes<HTMLParagraphElement>> = $props();
</script>

<p
  bind:this={ref}
  data-slot="item-description"
  class={["description", className]}
  {...restProps}
>
  {@render children?.()}
</p>

<style>
@layer max-ts-svelte-components {
  .description {
    color: var(--colors-text-secondary);
    font-size: var(--fontSize-sm);
    line-height: var(--lineHeight-normal);
    font-weight: var(--fontWeight-normal);
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .description > :global(a) {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  .description > :global(a:hover) {
    color: var(--colors-primary);
  }
}
</style>
