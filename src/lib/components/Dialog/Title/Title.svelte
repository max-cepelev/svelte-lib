<script lang="ts">
import { Dialog as DialogPrimitive } from 'bits-ui';
import type { DialogTitleProps } from '../types';

let {
  ref = $bindable(null),
  class: className,
  ...restProps
}: DialogTitleProps = $props();
</script>

<DialogPrimitive.Title
  bind:ref
  data-slot="dialog-title"
  class={className}
  {...restProps}
/>

<style>
@layer max-ts-svelte-components {
  :global {
    [data-slot="dialog-title"] {
      font-size: var(--fontSize-lg);
      font-weight: var(--fontWeight-semibold);
      line-height: var(--lineHeight-snug);
    }
  }
}
</style>
