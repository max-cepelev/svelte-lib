<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements';
import { getEmblaContext } from '../context';
import styles from './styles.css';
import type { WithElementRef } from '~/types';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();

const emblaCtx = getEmblaContext('<Carousel.Item/>');
</script>

<div
  bind:this={ref}
  data-slot="carousel-item"
  role="group"
  aria-roledescription="slide"
  class={[
		styles.item,
		styles.orientation[emblaCtx.orientation],
		className
	]}
  data-embla-slide=""
  {...restProps}
>
  {@render children?.()}
</div>
