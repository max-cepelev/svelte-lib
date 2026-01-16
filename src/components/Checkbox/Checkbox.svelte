

<script lang="ts">
import { CheckIcon, MinusIcon } from '@lucide/svelte';
import { Checkbox as CheckboxPrimitive } from 'bits-ui';
import type { WithoutChildrenOrChild } from '../../types.js';
import styles from './styles.css.js';

let {
	ref = $bindable(null),
	checked = $bindable(false),
	indeterminate = $bindable(false),
	class: className,
	...restProps
}: WithoutChildrenOrChild<CheckboxPrimitive.RootProps> = $props();
</script>

<CheckboxPrimitive.Root
	bind:ref
	data-slot="checkbox"
	class={[
		styles.checkboxBase,
		className
	]}
	bind:checked
	bind:indeterminate
	{...restProps}
>
	{#snippet children({ checked, indeterminate })}
		<div data-slot="checkbox-indicator" class={styles.checkboxIndicator}>
			{#if checked}
				<CheckIcon size={16} />
			{:else if indeterminate}
				<MinusIcon size={16} />
			{/if}
		</div>
	{/snippet}
</CheckboxPrimitive.Root>