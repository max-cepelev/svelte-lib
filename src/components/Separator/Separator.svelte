<script lang="ts">
import { Separator as SeparatorPrimitive } from 'bits-ui';
import styles from './styles.css.js';
import type { SeparatorProps } from './types.js';

let {
	ref = $bindable(null),
	class: className,
	'data-slot': dataSlot = 'separator',
	...restProps
}: SeparatorProps = $props();
</script>

<SeparatorPrimitive.Root
	bind:ref
	data-slot={dataSlot}
	class={[styles.separator, className]}
	{...restProps}
/>