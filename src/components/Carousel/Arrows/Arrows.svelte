<script lang="ts">
import { ArrowLeftIcon } from '@lucide/svelte';
import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
import type { SvelteHTMLElements } from 'svelte/elements';
import { getEmblaContext } from '../context';
import styles from './styles.css';

let {
  class: className,
  ...restProps
}: Omit<SvelteHTMLElements['button'], 'children'> = $props();

const emblaNextCtx = getEmblaContext('<Carousel.Next/>');
const emblaPrevCtx = getEmblaContext('<Carousel.Previous/>');
</script>

<button
  data-slot="carousel-previous"
  disabled={!emblaPrevCtx.canScrollPrev}
  class={[styles.buttonPrev[emblaPrevCtx.orientation], className]}
  onclick={emblaPrevCtx.scrollPrev}
  onkeydown={emblaPrevCtx.handleKeyDown}
  aria-label="Previous slide"
  {...restProps}
>
  <span class={styles.iconWrapper}>
    <ArrowLeftIcon />
  </span>
</button>
<button
  data-slot="carousel-next"
  disabled={!emblaNextCtx.canScrollNext}
  aria-disabled={!emblaNextCtx.canScrollNext}
  class={[styles.buttonNext[emblaNextCtx.orientation], className]}
  onclick={emblaNextCtx.scrollNext}
  onkeydown={emblaNextCtx.handleKeyDown}
  aria-label="Next slide"
  {...restProps}
>
  <span class={styles.iconWrapper}>
    <ArrowRightIcon />
  </span>
</button>
