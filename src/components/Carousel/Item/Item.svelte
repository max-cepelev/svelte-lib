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

<!-- biome-ignore lint/a11y/useSemanticElements: Carousel slides need group semantics without fieldset behavior. -->
<div
  bind:this={ref}
  data-slot="carousel-item"
  data-orientation={carouselCtx.orientation}
  data-align={carouselCtx.align}
  role="group"
  aria-roledescription="slide"
  class={[
    styles.item,
    styles.orientation[carouselCtx.orientation],
    styles.alignment[carouselCtx.align],
    className,
  ]}
  {...restProps}
>
  {@render children?.()}
</div>
