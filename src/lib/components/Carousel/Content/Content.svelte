<script lang="ts">
import { onMount } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '../../../types.ts';
import { getCarouselContext } from '../context';

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
    "content",
    className,
  ]}
  data-orientation={carouselCtx.orientation}
  {...restProps}
>
  {@render children?.()}
</div>

<style>
.content {
  display: flex;
  overflow: hidden;
  height: 100%;
  width: 100%;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &[data-orientation="horizontal"] {
    overflow-x: auto;
    overflow-y: hidden;
    flex-direction: row;
    scroll-snap-type: x mandatory;
    overscroll-behavior-x: contain;
    overscroll-behavior-y: auto;
    column-gap: var(--spacing-4);
  }

  &[data-orientation="vertical"] {
    overflow-y: auto;
    overflow-x: hidden;
    flex-direction: column;
    scroll-snap-type: y mandatory;
    overscroll-behavior-y: contain;
    overscroll-behavior-x: auto;
    row-gap: var(--spacing-4);
  }
}
</style>
