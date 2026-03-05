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
  carouselCtx.scrollTo(index);
};
</script>

<div
  class={[styles.wrapper[carouselCtx.orientation], className]}
  {...restProps}
>
  {#each carouselCtx.scrollSnaps as _, index}
    <button
      type="button"
      aria-label="Carousel Dots"
      class={[
        styles.dotButton[carouselCtx.orientation],
        {
          [styles.selected]: index === carouselCtx.selectedIndex,
        },
      ]}
      onclick={() => onClick(index)}
    ></button>
  {/each}
</div>
