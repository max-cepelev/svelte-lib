

<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '~/styles/index.js';
import { fieldVariants } from './styles.css.js';
import type { FieldOrientation } from './types.js';

let {
	ref = $bindable(null),
	class: className,
	orientation = 'vertical',
	children,
	...restProps
}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
	orientation?: FieldOrientation;
} = $props();
</script>

<div
	bind:this={ref}
	role="group"
	data-slot="field"
	data-orientation={orientation}
	class={[fieldVariants[orientation], className]}
	{...restProps}
>
	{@render children?.()}
</div>