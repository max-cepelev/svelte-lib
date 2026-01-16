<script lang="ts">
import { CheckIcon, MinusIcon } from '@lucide/svelte';
import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
import type { Snippet } from 'svelte';
import type { WithoutChildrenOrChild } from '../../../types.js';
import styles from './styles.css.js';

let {
	ref = $bindable(null),
	checked = $bindable(false),
	indeterminate = $bindable(false),
	class: className,
	children: childrenProp,
	...restProps
}: WithoutChildrenOrChild<DropdownMenuPrimitive.CheckboxItemProps> & {
	children?: Snippet;
} = $props();
</script>

<DropdownMenuPrimitive.CheckboxItem
	bind:ref
	bind:checked
	bind:indeterminate
	data-slot="dropdown-menu-checkbox-item"
	class={[styles.root, className]}
	{...restProps}
>
	{#snippet children({ checked, indeterminate })}
		<span
			class={styles.iconWrapper}
		>
			{#if indeterminate}
				<MinusIcon size={16} />
			{:else}
				<CheckIcon size={16} class={{
					[styles.unchecked]: !checked
				}} />
			{/if}
		</span>
		{@render childrenProp?.()}
	{/snippet}
</DropdownMenuPrimitive.CheckboxItem>