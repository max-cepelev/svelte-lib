<script lang="ts">
import { CircleIcon } from '@lucide/svelte';
import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
import type { WithoutChild } from '../../../types.js';
import styles from './styles.css.js';

let {
	ref = $bindable(null),
	class: className,
	children: childrenProp,
	...restProps
}: WithoutChild<DropdownMenuPrimitive.RadioItemProps> = $props();
</script>

<DropdownMenuPrimitive.RadioItem
	bind:ref
	data-slot="dropdown-menu-radio-item"
	class={[styles.item, className]}
	{...restProps}
>
	{#snippet children({ checked })}
		<span class={styles.indicator}>
			{#if checked}
				<CircleIcon class={styles.icon} />
			{/if}
		</span>
		{@render childrenProp?.({ checked })}
	{/snippet}
</DropdownMenuPrimitive.RadioItem>