<script lang="ts">
import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
import type { DropdownMenuProps } from './types.js';

let { open = $bindable(false), ...restProps }: DropdownMenuProps = $props();
</script>

<DropdownMenuPrimitive.Root bind:open {...restProps} />
