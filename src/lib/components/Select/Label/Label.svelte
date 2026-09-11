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
  data-slot="select-label"
  class={["label", className]}
  {...restProps}
>
  {@render children?.()}
</div>

<style>
@layer max-ts-svelte-components {
  .label {
    color: var(--colors-text-secondary);
    padding-left: var(--spacing-2);
    padding-right: var(--spacing-2);
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    font-size: var(--fontSize-xs);
  }
}
</style>
