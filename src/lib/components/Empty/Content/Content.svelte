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
  data-slot="empty-content"
  class={["content", className]}
  {...restProps}
>
  {@render children?.()}
</div>

<style>
@layer max-ts-svelte-components {
  .content {
    display: flex;
    width: 100%;
    max-width: 24rem;
    min-width: 0;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-4);
    font-size: var(--fontSize-sm);
    text-wrap: balance;
  }
}
</style>
