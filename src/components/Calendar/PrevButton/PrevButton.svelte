<script lang="ts">
import { ChevronLeftIcon } from '@lucide/svelte';
import { Calendar as CalendarPrimitive } from 'bits-ui';
import { type ButtonVariant, buttonVariants } from '~/components/index.js';
import styles from './styles.css.js';

let {
	ref = $bindable(null),
	class: className,
	children,
	variant = 'ghost',
	...restProps
}: CalendarPrimitive.PrevButtonProps & {
	variant?: ButtonVariant;
} = $props();
</script>

{#snippet fallback()}
	<ChevronLeftIcon size={16} />
{/snippet}

<CalendarPrimitive.PrevButton
	bind:ref
	class={[buttonVariants[variant], styles.prevButton, className]}
	children={children || fallback}
	{...restProps}
/>