<script lang="ts">
import { onDestroy, tick, untrack } from 'svelte';
import { setCarouselContext } from './context';
import { CarouselStore } from './store.svelte';
import styles from './styles.css';
import type { CarouselProps } from './types';

let {
  ref = $bindable(null),
  setApi = () => {},
  orientation = 'horizontal',
  align = 'center',
  initialIndex = 0,
  loop = false,
  class: className,
  children,
  onkeydowncapture,
  ...restProps
}: CarouselProps = $props();

const carouselStore = untrack(
  () => new CarouselStore({ orientation, align, initialIndex, loop }),
);
setCarouselContext(carouselStore);

const handleKeyDownCapture: NonNullable<CarouselProps['onkeydowncapture']> = (
  event,
) => {
  onkeydowncapture?.(event);
  carouselStore.handleKeyDown(event);
};

onDestroy(() => {
  carouselStore.destroy();
});

$effect(() => {
  const options = { align, loop, orientation };
  const didChange = untrack(() => carouselStore.updateOptions(options));
  if (didChange) {
    void tick().then(() => carouselStore.api.reInit());
  }
});

$effect(() => {
  const callback = setApi;
  callback(carouselStore.api);
  return () => callback(undefined);
});
</script>

<!-- svelte-ignore a11y_no_redundant_roles: Explicit role is required for aria-roledescription. -->
<section
  {...restProps}
  bind:this={ref}
  data-slot="carousel"
  class={[styles.carousel, className]}
  role="region"
  aria-roledescription="carousel"
  onkeydowncapture={handleKeyDownCapture}
>
  {@render children?.()}
</section>
