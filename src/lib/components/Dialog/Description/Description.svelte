<script lang="ts">
import { Dialog as DialogPrimitive } from 'bits-ui';
import type { DialogDescriptionProps } from '../types';

let {
  ref = $bindable(null),
  class: className,
  ...restProps
}: DialogDescriptionProps = $props();

const classNames = $derived(['description', className]);
</script>

<DialogPrimitive.Description
  bind:ref
  data-slot="dialog-description"
  class={classNames}
  {...restProps}
/>

<style>
@layer max-ts-svelte-components {
  :global([data-slot="dialog-description"].description) {
    color: var(--colors-text-secondary);
    font-size: var(--fontSize-sm);
  }
}
</style>
