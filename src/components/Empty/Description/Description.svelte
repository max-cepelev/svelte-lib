<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '../../../types.js';
import styles from '../styles.css.js';

let {
	ref = $bindable(null),
	class: className,
	children,
	...restProps
}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="empty-description"
	class={[styles.description, className]}
	{...restProps}
>
	{@render children?.()}
</div>
