<script lang="ts">
import { Popover as PopoverPrimitive } from 'bits-ui';
import type { PopoverProps } from './types';

let {
  open = $bindable(false),
  children,
  ...restProps
}: PopoverProps = $props();
</script>

<PopoverPrimitive.Root bind:open {...restProps}>
  {@render children?.()}
</PopoverPrimitive.Root>
