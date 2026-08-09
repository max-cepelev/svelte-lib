<script lang="ts">
import type { SvelteHTMLElements } from 'svelte/elements';
import { getCarouselContext } from '../context';
import styles from './styles.css';

let {
  class: className,
  ...restProps
}: Omit<SvelteHTMLElements['div'], 'children'> = $props();

const carouselCtx = getCarouselContext('<Carousel.Dots/>');

const onClick = (index: number) => {
  carouselCtx.api.scrollToSnap(index);
};
</script>

<div
  class={[styles.wrapper[carouselCtx.orientation], className]}
  {...restProps}
>
  {#each carouselCtx.scrollSnaps as snap, index (snap)}
    <button
      type="button"
      aria-label={`Go to slide ${index + 1}`}
      aria-current={index === carouselCtx.selectedIndex ? 'true' : undefined}
      data-selected={index === carouselCtx.selectedIndex}
      class={styles.dotButton[carouselCtx.orientation]}
      onclick={() => onClick(index)}
    ></button>
  {/each}
</div>
