<script lang="ts">
import type { ComponentProps } from 'svelte';
import { Separator } from '../../Separator/index.js';
import styles from './styles.css.js';

let {
	ref = $bindable(null),
	class: className,
	orientation = 'vertical',
	...restProps
}: ComponentProps<typeof Separator> = $props();
</script>

<Separator
	bind:ref
	data-slot="button-group-separator"
	{orientation}
	class={[styles.separator, className]}
	{...restProps}
/>
