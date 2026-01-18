<script lang="ts">
import { Accordion as AccordionPrimitive } from 'bits-ui';
import type { WithoutChild } from '../../../types.js';
import styles from './styles.css.js';

let {
	ref = $bindable(null),
	class: className,
	children,
	...restProps
}: WithoutChild<AccordionPrimitive.ContentProps> = $props();
</script>

<AccordionPrimitive.Content
	bind:ref
	data-slot="accordion-content"
	class={styles.content}
	{...restProps}
>
	<div class={[styles.inner, className]}>
		{@render children?.()}
	</div>
</AccordionPrimitive.Content>