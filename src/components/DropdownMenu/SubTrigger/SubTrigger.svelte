<script lang="ts">
import { ChevronRightIcon } from '@lucide/svelte';
import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
import styles from './styles.css.js';

let {
	ref = $bindable(null),
	class: className,
	inset,
	children,
	...restProps
}: DropdownMenuPrimitive.SubTriggerProps & {
	inset?: boolean;
} = $props();
</script>

<DropdownMenuPrimitive.SubTrigger
	bind:ref
	data-slot="dropdown-menu-sub-trigger"
	data-inset={inset}
	class={[styles.subTrigger, className]}
	{...restProps}
>
	{@render children?.()}
	<ChevronRightIcon class={styles.icon} />
</DropdownMenuPrimitive.SubTrigger>