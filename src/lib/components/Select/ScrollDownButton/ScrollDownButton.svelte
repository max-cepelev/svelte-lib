<script lang="ts">
import { ChevronDownIcon } from '@lucide/svelte';
import { Select as SelectPrimitive } from 'bits-ui';
import type { WithoutChildrenOrChild } from '../../../types.ts';

let {
  ref = $bindable(null),
  class: className,
  ...restProps
}: WithoutChildrenOrChild<SelectPrimitive.ScrollDownButtonProps> = $props();
</script>

<SelectPrimitive.ScrollDownButton
  bind:ref
  data-slot="select-scroll-down-button"
  class={["scroll-down-button", className]}
  {...restProps}
>
  <ChevronDownIcon size={16} />
</SelectPrimitive.ScrollDownButton>

<style>
@layer max-ts-svelte-components {
  :global([data-slot="select-scroll-down-button"].scroll-down-button) {
    display: flex;
    cursor: default;
    align-items: center;
    justify-content: center;
    padding-top: var(--spacing-1);
    padding-bottom: var(--spacing-1);
  }
}
</style>
