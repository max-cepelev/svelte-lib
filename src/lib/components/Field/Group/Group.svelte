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
  data-slot="field-group"
  class={["root", className]}
  {...restProps}
>
  {@render children?.()}
</div>

<style>
@layer max-ts-svelte-components {
  .root {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: var(--spacing-2);
    container-type: inline-size;
    container-name: field-group;
  }
  .root:global([data-slot="checkbox-group"]),
  .root:global([data-slot="radio-group"]) {
    gap: var(--spacing-2);
  }
  .root > :global([data-slot="field-group"]) {
    gap: var(--spacing-2);
  }
}
</style>
