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
  data-slot="card-footer"
  class={["footer", className]}
  {...restProps}
>
  {@render children?.()}
</div>

<style>
@layer max-ts-svelte-components {
  .footer {
    display: flex;
    align-items: center;
    padding-left: var(--spacing-6);
    padding-right: var(--spacing-6);

    &:global([data-slot="card-footer-border"]) {
      padding-top: var(--spacing-6);
    }
  }
}
</style>
