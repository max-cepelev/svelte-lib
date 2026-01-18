<script lang="ts">
import { Popover as PopoverPrimitive } from 'bits-ui';
import type { PopoverPortalProps } from '../types.js';

let { children, ...restProps }: PopoverPortalProps = $props();
</script>

<PopoverPrimitive.Portal {...restProps}>
	{@render children?.()}
</PopoverPrimitive.Portal>
