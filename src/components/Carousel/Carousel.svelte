<script lang="ts">
import { setEmblaContext } from './context';
import styles from './styles.css';
import {
  type CarouselAPI,
  type CarouselProps,
  type EmblaContext,
} from './types';

let {
  ref = $bindable(null),
  options,
  plugins,
  setApi = () => {},
  orientation = 'horizontal',
  class: className,
  children,
  ...restProps
}: CarouselProps = $props();

let carouselState = $state<EmblaContext>({
  api: undefined,
  scrollPrev,
  scrollNext,
  orientation: 'horizontal',
  canScrollNext: false,
  canScrollPrev: false,
  handleKeyDown,
  options: {},
  plugins: [],
  onInit,
  scrollSnaps: [],
  selectedIndex: 0,
  scrollTo,
});

setEmblaContext(carouselState);

function scrollPrev() {
  carouselState.api?.scrollPrev();
}

function scrollNext() {
  carouselState.api?.scrollNext();
}

function scrollTo(index: number, jump?: boolean) {
  carouselState.api?.scrollTo(index, jump);
}

function onSelect() {
  if (!carouselState.api) return;
  carouselState.selectedIndex = carouselState.api.selectedScrollSnap();
  carouselState.canScrollNext = carouselState.api.canScrollNext();
  carouselState.canScrollPrev = carouselState.api.canScrollPrev();
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    scrollPrev();
  } else if (e.key === 'ArrowRight') {
    e.preventDefault();
    scrollNext();
  }
}

function onInit(event: CustomEvent<CarouselAPI>) {
  carouselState.api = event.detail;
  setApi(carouselState.api);

  carouselState.scrollSnaps = carouselState.api.scrollSnapList();
  carouselState.api.on('select', onSelect);
  onSelect();
}

$effect(() => {
  if (orientation) {
    carouselState.orientation = orientation;
  }

  if (options) {
    carouselState.options = options;
  }

  if (plugins?.length) {
    carouselState.plugins = plugins;
  }

  return () => {
    carouselState.api?.off('select', onSelect);
  };
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
