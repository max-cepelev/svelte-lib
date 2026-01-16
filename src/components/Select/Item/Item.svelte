<script lang="ts">
import { CheckIcon } from '@lucide/svelte';
import { Select as SelectPrimitive } from 'bits-ui';
import type { WithoutChild } from '../../../types.js';
import styles from './styles.css.js';

let {
	ref = $bindable(null),
	class: className,
	value,
	label,
	children: childrenProp,
	...restProps
}: WithoutChild<SelectPrimitive.ItemProps> = $props();
</script>

<SelectPrimitive.Item
	bind:ref
	{value}
	data-slot="select-item"
	class={[styles.item, className]}
	{...restProps}
>
	{#snippet children({ selected, highlighted })}
		<span class={styles.checkSpan}>
			{#if selected}
				<CheckIcon size={16} />
			{/if}
		</span>
		{#if childrenProp}
			{@render childrenProp({ selected, highlighted })}
		{:else}
			{label || value}
		{/if}
	{/snippet}
</SelectPrimitive.Item>