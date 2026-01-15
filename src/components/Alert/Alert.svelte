<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '~/styles/index.js';
import { alertVariants } from './styles.css.js';
import type { AlertVariant } from './types.js';

let {
	ref = $bindable(null),
	class: className,
	variant = 'default',
	children,
	...restProps
}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
	variant?: AlertVariant;
} = $props();

const classNames = $derived([alertVariants[variant], className]);
</script>

<div
	bind:this={ref}
	data-slot="alert"
	class={classNames}
	{...restProps}
	role="alert"
>
	{@render children?.()}
</div>
