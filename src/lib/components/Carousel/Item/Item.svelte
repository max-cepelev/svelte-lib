<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '../../../types.ts';
import { getCarouselContext } from '../context';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();

const carouselCtx = getCarouselContext('<Carousel.Item/>');
</script>

<!-- biome-ignore lint/a11y/useSemanticElements: Carousel slides need group semantics without fieldset behavior. -->
<div
  bind:this={ref}
  data-slot="carousel-item"
  data-orientation={carouselCtx.orientation}
  data-align={carouselCtx.align}
  role="group"
  aria-roledescription="slide"
  class={[
    "item",
    `align-${carouselCtx.align}`,
    className,
  ]}
  {...restProps}
>
  {@render children?.()}
</div>

<style>
.item {
  min-width: 0;
  flex-shrink: 0;
  flex-grow: 0;
  flex-basis: 100%;

  &[data-orientation="horizontal"] {
    scroll-snap-stop: always;
  }
  &[data-orientation="vertical"] {
    scroll-snap-stop: always;
  }

  &[data-align="start"] {
    scroll-snap-align: start;
  }
  &[data-align="center"] {
    scroll-snap-align: center;
  }
  &[data-align="end"] {
    scroll-snap-align: end;
  }
}
</style>
