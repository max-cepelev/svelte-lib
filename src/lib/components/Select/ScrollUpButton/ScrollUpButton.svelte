<script lang="ts">
import { ChevronUpIcon } from '@lucide/svelte';
import { Select as SelectPrimitive } from 'bits-ui';
import type { WithoutChildrenOrChild } from '../../../types.ts';

let {
  ref = $bindable(null),
  class: className,
  ...restProps
}: WithoutChildrenOrChild<SelectPrimitive.ScrollUpButtonProps> = $props();
</script>

<SelectPrimitive.ScrollUpButton
  bind:ref
  data-slot="select-scroll-up-button"
  class={["scroll-up-button", className]}
  {...restProps}
>
  <ChevronUpIcon class="select-scroll-up-button-icon" />
</SelectPrimitive.ScrollUpButton>

<style>
@layer max-ts-svelte-components {
  :global([data-slot="select-scroll-up-button"].scroll-up-button) {
    display: flex;
    cursor: default;
    align-items: center;
    justify-content: center;
    padding-top: var(--spacing-1);
    padding-bottom: var(--spacing-1);
  }
  :global(.select-scroll-up-button-icon) {
    width: var(--spacing-4);
    height: var(--spacing-4);
  }
}
</style>
