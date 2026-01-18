<script lang="ts">
import { Popover as PopoverPrimitive } from 'bits-ui';
import PopoverPortal from '../Portal/PopoverPortal.svelte';
import styles from '../styles.css.js';
import type { PopoverContentProps } from '../types.js';

let {
	ref = $bindable(null),
	class: className,
	sideOffset = 4,
	align = 'center',
	portalProps,
	children,
	...restProps
}: PopoverContentProps = $props();
</script>

<PopoverPortal {...portalProps}>
	<PopoverPrimitive.Content
		bind:ref
		data-slot="popover-content"
		{sideOffset}
		{align}
		class={[styles.content, className]}
		{...restProps}
	>
		{@render children?.()}
	</PopoverPrimitive.Content>
</PopoverPortal>
