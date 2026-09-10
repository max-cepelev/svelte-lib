<script lang="ts">
import { Popover as PopoverPrimitive } from 'bits-ui';

import type { PopoverCloseProps } from '../types';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: PopoverCloseProps = $props();
</script>

<PopoverPrimitive.Close
  bind:ref
  data-slot="popover-close"
  class={["close", className]}
  {...restProps}
>
  {@render children?.()}
</PopoverPrimitive.Close>

<style>
:global([data-slot="popover-close"].close) {
  cursor: pointer;
}
</style>
