<script lang="ts">
import { onDestroy } from 'svelte';
import { setCarouselContext } from './context';
import { CarouselStore } from './store.svelte';
import styles from './styles.css';
import type { CarouselProps } from './types';

let {
  ref = $bindable(null),
  setApi = () => {},
  orientation = 'horizontal',
  align,
  class: className,
  children,
  ...restProps
}: CarouselProps = $props();

const carouselStore = new CarouselStore({
  get orientation() {
    return orientation;
  },
  get align() {
    return align;
  },
});
setCarouselContext(carouselStore);

onDestroy(() => {
  carouselStore.destroy();
});

$effect(() => {
  setApi(carouselStore.api);
});
</script>

<div
  bind:this={ref}
  data-slot="carousel"
  class={[styles.carousel, className]}
  role="region"
  aria-roledescription="carousel"
  {...restProps}
>
  {@render children?.()}
</div>
