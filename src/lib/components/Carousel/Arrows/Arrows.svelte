<script lang="ts">
import { ArrowLeftIcon } from '@lucide/svelte';
import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
import type { SvelteHTMLElements } from 'svelte/elements';
import { getCarouselContext } from '../context';

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
  class={[`button-prev-${ctx.orientation} button`, className]}
  onclick={handlePreviousClick}
  aria-label="Previous slide"
>
  <span class="icon-wrapper"> <ArrowLeftIcon /> </span>
</button>
<button
  {...restProps}
  type="button"
  data-slot="carousel-next"
  disabled={!ctx.canScrollNext}
  aria-disabled={!ctx.canScrollNext}
  class={[`button-next-${ctx.orientation} button`, className]}
  onclick={handleNextClick}
  aria-label="Next slide"
>
  <span class="icon-wrapper"> <ArrowRightIcon /> </span>
</button>

<style>
.button {
  position: absolute;
  z-index: 2;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.button:disabled {
  user-select: none;
  cursor: default;
  opacity: 0.5;
}
.icon-wrapper {
  width: var(--spacing-8);
  height: var(--spacing-8);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--colors-background-paper);
  border-radius: 9999px;
  transition: transform 0.2s ease;
}
.button:not(:disabled):hover .icon-wrapper {
  transform: scale(1.1);
}
.icon-wrapper :global(svg) {
  width: var(--spacing-5);
  height: var(--spacing-5);
}
.button-next-horizontal {
  right: 0;
  top: 0;
  width: clamp(2.5rem, 4vw, 4rem);
  height: 100%;
}
.button-next-vertical {
  left: 0;
  bottom: 0;
  width: 100%;
  height: clamp(2.5rem, 4vw, 4rem);
}
.button-prev-horizontal {
  left: 0;
  top: 0;
  width: clamp(2.5rem, 4vw, 4rem);
  height: 100%;
}
.button-prev-vertical {
  right: 0;
  top: 0;
  width: 100%;
  height: clamp(2.5rem, 4vw, 4rem);
}
.button-next-vertical :global(svg),
.button-prev-vertical :global(svg) {
  transform: rotate(90deg);
}
</style>
