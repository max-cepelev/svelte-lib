<script lang="ts">
import emblaCarouselSvelte from 'embla-carousel-svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '../../../types.ts';
import { getEmblaContext } from '../context';
import styles from './styles.css';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();

const emblaCtx = getEmblaContext('<Carousel.Content/>');
</script>

<div
  data-slot="carousel-content-wrapper"
  class={styles.contentWrapper}
  use:emblaCarouselSvelte={{
    options: {
      container: '[data-embla-container]',
      slides: '[data-embla-slide]',
      ...emblaCtx.options,
      axis: emblaCtx.orientation === 'horizontal' ? 'x' : 'y',
    },
    plugins: emblaCtx.plugins,
  }}
  onemblaInit={emblaCtx.onInit}
>
  <div
    bind:this={ref}
    class={[
      styles.container,
      styles.orientation[emblaCtx.orientation],
      className,
    ]}
    data-embla-container=""
    {...restProps}
  >
    {@render children?.()}
  </div>
</div>
