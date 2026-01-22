<script lang="ts">
import { Tabs as TabsPrimitive } from 'bits-ui';
import styles from '../styles.css.js';
import type { TabsListProps } from '../types.js';

let {
	ref = $bindable(null),
	class: className,
	children,
	...restProps
}: TabsListProps = $props();
</script>

<TabsPrimitive.List
	bind:ref
	data-slot="tabs-list"
	class={[styles.list, className]}
	{...restProps}
>
	{@render children?.()}
</TabsPrimitive.List>
