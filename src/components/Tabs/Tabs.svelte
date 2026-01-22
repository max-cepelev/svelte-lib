<script lang="ts">
import { Tabs as TabsPrimitive } from 'bits-ui';
import styles from './styles.css.js';
import type { TabsProps } from './types.js';

let {
	ref = $bindable(null),
	value = $bindable(''),
	class: className,
	children,
	...restProps
}: TabsProps = $props();
</script>

<TabsPrimitive.Root
	bind:ref
	bind:value
	data-slot="tabs"
	class={[styles.root, className]}
	{...restProps}
>
	{@render children?.()}
</TabsPrimitive.Root>
