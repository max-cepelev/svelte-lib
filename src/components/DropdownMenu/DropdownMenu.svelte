<script lang="ts">
import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
import type { Props } from './types.js';

let { open = $bindable(false), ...restProps }: Props =
	$props();
</script>

<DropdownMenuPrimitive.Root bind:open {...restProps} />