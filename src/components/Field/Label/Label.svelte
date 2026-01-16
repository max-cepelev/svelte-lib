<script lang="ts">
import type { ComponentProps } from 'svelte';
import { Label } from '../../Label/index.js';
import styles from './styles.css.js';

let {
	ref = $bindable(null),
	class: className,
	children,
	...restProps
}: ComponentProps<typeof Label> = $props();
</script>

<Label
	bind:ref
	data-slot="field-label"
	class={[styles.root, className]}
	{...restProps}
>
	{@render children?.()}
</Label>