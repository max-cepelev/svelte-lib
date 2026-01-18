<script lang="ts">
import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
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

const emblaCtx = getEmblaContext('<Carousel.Previous/>');
</script>

<Button
	data-slot="carousel-previous"
	{variant}
	{size}
	disabled={!emblaCtx.canScrollPrev}
	class={[
		styles.button,
		styles.orientation[emblaCtx.orientation],
		className
	]}
	onclick={emblaCtx.scrollPrev}
	onkeydown={emblaCtx.handleKeyDown}
	bind:ref
	{...restProps}
>
	<ArrowLeftIcon />
	<span>Previous slide</span>
</Button>
