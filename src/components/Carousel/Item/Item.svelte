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

const emblaCtx = getCarouselContext('<Carousel.Item />');
</script>

<div
  bind:this={ref}
  data-slot="carousel-item"
  data-orientation={emblaCtx.orientation}
  role="group"
  aria-roledescription="slide"
  class={[styles.item, styles.orientation[emblaCtx.orientation], className]}
  {...restProps}
>
  {@render children?.()}
</div>
