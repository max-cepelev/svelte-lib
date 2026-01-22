<script lang="ts">
import { Tabs as TabsPrimitive } from 'bits-ui';
import type { TabsContentProps } from '../types.js';
import styles from '../styles.css.js';


let {
	ref = $bindable(null),
	class: className,
	children,
	...restProps
}: TabsContentProps = $props();
</script>

<TabsPrimitive.Content
	bind:ref
	data-slot="tabs-content"
	class={[styles.content, className]}
	{...restProps}
>
	{@render children?.()}
</TabsPrimitive.Content>
