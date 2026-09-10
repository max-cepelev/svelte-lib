<script lang="ts">
import type { SvelteHTMLElements } from 'svelte/elements';
import { getCarouselContext } from '../context';

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
  data-orientation={carouselCtx.orientation}
  class={['wrapper', className]}
  {...restProps}
>
  {#each carouselCtx.scrollSnaps as snap, index (snap)}
    <button
      type="button"
      aria-label={`Go to slide ${index + 1}`}
      aria-current={index === carouselCtx.selectedIndex ? 'true' : undefined}
      data-selected={index === carouselCtx.selectedIndex}
      class={"button"}
      data-orientation={carouselCtx.orientation}
      onclick={() => onClick(index)}
    ></button>
  {/each}
</div>

<style>
.wrapper {
  display: flex;
  position: absolute;
  z-index: 1;
  overflow: auto;
  justify-content: center;
  gap: var(--spacing-1);

  &[data-orientation="horizontal"] {
    width: 100%;
    height: auto;
    bottom: var(--spacing-2);
    left: 0;
  }

  &[data-orientation="vertical"] {
    width: auto;
    height: 100%;
    bottom: 0;
    left: var(--spacing-4);
    flex-direction: column;
  }
}

.button {
  width: var(--spacing-6);
  height: var(--spacing-6);
  position: relative;
  border: none;
  background: transparent;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:after {
    background-color: var(--colors-border);
  }

  &[data-selected="true"]:after {
    background-color: var(--colors-primary);
  }

  &[data-orientation="horizontal"]::after {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    height: 2px;
  }

  &[data-orientation="vertical"]::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
  }
}
</style>
