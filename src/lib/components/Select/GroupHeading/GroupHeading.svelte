<script lang="ts">
import { Select as SelectPrimitive } from 'bits-ui';
import type { ComponentProps } from 'svelte';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: ComponentProps<typeof SelectPrimitive.GroupHeading> = $props();
</script>

<SelectPrimitive.GroupHeading
  bind:ref
  data-slot="select-group-heading"
  class={["group-heading", className]}
  {...restProps}
>
  {@render children?.()}
</SelectPrimitive.GroupHeading>

<style>
@layer max-ts-svelte-components {
  :global([data-slot="select-group-heading"].group-heading) {
    color: var(--colors-text-secondary);
    padding-left: var(--spacing-2);
    padding-right: var(--spacing-2);
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    font-size: var(--fontSize-xs);
  }
}
</style>
