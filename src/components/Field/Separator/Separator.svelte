<script lang="ts">
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '../../../types.js';
import { Separator } from '../../Separator/index.js';
import styles from './styles.css.js';

let {
	ref = $bindable(null),
	class: className,
	children,
	...restProps
}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
	children?: Snippet;
} = $props();

const hasContent = $derived(!!children);
</script>

<div
	bind:this={ref}
	data-slot="field-separator"
	data-content={hasContent}
	class={[styles.root, className]}
	{...restProps}
>
	<Separator class={styles.separator} />
	{#if children}
		<span
			class={styles.content}
			data-slot="field-separator-content"
		>
			{@render children()}
		</span>
	{/if}
</div>