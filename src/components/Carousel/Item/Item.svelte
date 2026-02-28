<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '../../../types.ts';
import { getCarouselContext } from '../context';
import styles from './styles.css';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();

const carouselCtx = getCarouselContext('<Carousel.Item/>');
</script>

<div
  bind:this={ref}
  data-slot="carousel-item"
  data-orientation={carouselCtx.orientation}
  role="group"
  aria-roledescription="slide"
  class={[styles.item, styles.orientation[carouselCtx.orientation], className]}
  {...restProps}
>
  {@render children?.()}
</div>
