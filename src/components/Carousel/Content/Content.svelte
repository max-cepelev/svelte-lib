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

const emblaCtx = getCarouselContext('<Carousel.Content />');
onMount(() => {
  emblaCtx.setViewport(ref as HTMLDivElement | null);
  return () => emblaCtx.setViewport(null);
});
</script>

<div
  bind:this={ref}
  data-slot="carousel-content"
  class={[
    styles.content,
    styles.orientation[emblaCtx.orientation],
    className,
  ]}
  data-orientation={emblaCtx.orientation}
  {...restProps}
>
  {@render children?.()}
</div>
