<script lang="ts">
import { onMount } from 'svelte';
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

const carouselCtx = getCarouselContext('<Carousel.Content />');
onMount(() => {
  carouselCtx.setViewport(ref as HTMLDivElement | null);
  return () => carouselCtx.setViewport(null);
});
</script>

<div
  bind:this={ref}
  data-slot="carousel-content"
  class={[
    styles.content,
    styles.orientation[carouselCtx.orientation],
    className,
  ]}
  data-orientation={carouselCtx.orientation}
  {...restProps}
>
  {@render children?.()}
</div>
