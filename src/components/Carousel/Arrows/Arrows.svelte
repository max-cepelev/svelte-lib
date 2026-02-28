<script lang="ts">
import { ArrowLeftIcon } from '@lucide/svelte';
import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
import type { SvelteHTMLElements } from 'svelte/elements';
import { getCarouselContext } from '../context';
import styles from './styles.css';

let {
  class: className,
  ...restProps
}: Omit<SvelteHTMLElements['button'], 'children'> = $props();

const ctx = getCarouselContext('<Carousel.Arrows />');
</script>

<button
  type="button"
  data-slot="carousel-previous"
  disabled={!ctx.canScrollPrev}
  class={[styles.buttonPrev[ctx.orientation], className]}
  onclick={ctx.scrollPrev}
  onkeydown={ctx.handleKeyDown}
  aria-label="Previous slide"
  {...restProps}
>
  <span class={styles.iconWrapper}> <ArrowLeftIcon /> </span>
</button>
<button
  type="button"
  data-slot="carousel-next"
  disabled={!ctx.canScrollNext}
  aria-disabled={!ctx.canScrollNext}
  class={[styles.buttonNext[ctx.orientation], className]}
  onclick={ctx.scrollNext}
  onkeydown={ctx.handleKeyDown}
  aria-label="Next slide"
  {...restProps}
>
  <span class={styles.iconWrapper}> <ArrowRightIcon /> </span>
</button>
