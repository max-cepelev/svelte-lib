<script lang="ts">
import { Popover as PopoverPrimitive } from 'bits-ui';

import type { PopoverTriggerProps } from '../types';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: PopoverTriggerProps = $props();
</script>

<PopoverPrimitive.Trigger
  bind:ref
  data-slot="popover-trigger"
  class={["trigger", className]}
  {...restProps}
>
  {@render children?.()}
</PopoverPrimitive.Trigger>

<style>
:global([data-slot="popover-trigger"].trigger) {
  cursor: pointer;
}
</style>
