<script lang="ts">
import { ArrowLeftIcon } from '@lucide/svelte';
import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
import type { SvelteHTMLElements } from 'svelte/elements';
import { getCarouselContext } from '../context';
import styles from './styles.css';

let {
  class: className,
  onclick,
  ...restProps
}: Omit<SvelteHTMLElements['button'], 'children'> = $props();

const ctx = getCarouselContext('<Carousel.Arrows />');

type ButtonClickHandler = NonNullable<SvelteHTMLElements['button']['onclick']>;

const handlePreviousClick: ButtonClickHandler = (event) => {
  onclick?.(event);
  if (!event.defaultPrevented) ctx.scrollPrev();
};

const handleNextClick: ButtonClickHandler = (event) => {
  onclick?.(event);
  if (!event.defaultPrevented) ctx.scrollNext();
};
</script>

<button
  {...restProps}
  type="button"
  data-slot="carousel-previous"
  disabled={!ctx.canScrollPrev}
  aria-disabled={!ctx.canScrollPrev}
  class={[styles.buttonPrev[ctx.orientation], className]}
  onclick={handlePreviousClick}
  aria-label="Previous slide"
>
  <span class={styles.iconWrapper}> <ArrowLeftIcon /> </span>
</button>
<button
  {...restProps}
  type="button"
  data-slot="carousel-next"
  disabled={!ctx.canScrollNext}
  aria-disabled={!ctx.canScrollNext}
  class={[styles.buttonNext[ctx.orientation], className]}
  onclick={handleNextClick}
  aria-label="Next slide"
>
  <span class={styles.iconWrapper}> <ArrowRightIcon /> </span>
</button>
