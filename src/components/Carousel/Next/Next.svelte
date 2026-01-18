<script lang="ts">
import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
import { Button } from '../../Button/index.js';
import type { ButtonProps } from '../../Button/types.js';
import { getEmblaContext } from '../context.js';
import styles from './styles.css.js';

let {
	ref = $bindable(null),
	class: className,
	variant = 'outline',
	size = 'icon',
	...restProps
}: Omit<ButtonProps, 'children'> = $props();

const emblaCtx = getEmblaContext('<Carousel.Next/>');
</script>

<Button
	data-slot="carousel-next"
	{variant}
	{size}
	disabled={!emblaCtx.canScrollNext}
	class={[
		styles.button,
		styles.orientation[emblaCtx.orientation],
		className
	]}
	onclick={emblaCtx.scrollNext}
	onkeydown={emblaCtx.handleKeyDown}
	bind:ref
	{...restProps}
>
	<ArrowRightIcon />
	<span class="sr-only">Next slide</span>
</Button>
