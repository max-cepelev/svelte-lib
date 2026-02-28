<script lang="ts">
import { setEmblaContext } from './context';
import styles from './styles.css';
import {
  type CarouselAPI,
  type CarouselAlign,
  type CarouselProps,
  type CarouselContext,
} from './types';

let {
  ref = $bindable(null),
  setApi = () => {},
  orientation = 'horizontal',
  align,
  class: className,
  children,
  ...restProps
}: CarouselProps = $props();

let carouselState = $state<CarouselContext>({
  api: undefined,
  viewport: null,
  scrollPrev,
  scrollNext,
  orientation: 'horizontal',
  align: 'center',
  canScrollNext: false,
  canScrollPrev: false,
  handleKeyDown,
  setViewport,
  refresh,
  scrollSnaps: [],
  selectedIndex: 0,
  scrollTo,
});

setEmblaContext(carouselState);
const listeners = new Set<() => void>();

const api: CarouselAPI = {
  scrollPrev,
  scrollNext,
  scrollTo,
  canScrollNext: () => carouselState.canScrollNext,
  canScrollPrev: () => carouselState.canScrollPrev,
  selectedScrollSnap: () => carouselState.selectedIndex,
  scrollSnapList: () => carouselState.scrollSnaps,
  on(event, callback) {
    if (event !== 'select') return;
    listeners.add(callback);
  },
  off(event, callback) {
    if (event !== 'select') return;
    listeners.delete(callback);
  },
};

carouselState.api = api;

function emitSelect() {
  for (const callback of listeners) {
    callback();
  }
}

function getSlides() {
  if (!carouselState.viewport) return [];
  return Array.from(
    carouselState.viewport.querySelectorAll<HTMLElement>(
      '[data-slot="carousel-item"]',
    ),
  );
}

function getAlign(): CarouselAlign {
  return carouselState.align === 'start' ||
    carouselState.align === 'end' ||
    carouselState.align === 'center'
    ? carouselState.align
    : 'center';
}

function getTargetFor(index: number) {
  if (!carouselState.viewport) return 0;
  const slides = getSlides();
  const slide = slides[index];
  if (!slide) return 0;

  const viewportSize =
    carouselState.orientation === 'horizontal'
      ? carouselState.viewport.clientWidth
      : carouselState.viewport.clientHeight;
  const slideSize =
    carouselState.orientation === 'horizontal'
      ? slide.offsetWidth
      : slide.offsetHeight;
  const slideStart =
    carouselState.orientation === 'horizontal'
      ? slide.offsetLeft
      : slide.offsetTop;

  const align = getAlign();
  let target = slideStart;

  if (align === 'center') {
    target = slideStart - (viewportSize - slideSize) / 2;
  } else if (align === 'end') {
    target = slideStart - (viewportSize - slideSize);
  }

  const max =
    carouselState.orientation === 'horizontal'
      ? carouselState.viewport.scrollWidth - carouselState.viewport.clientWidth
      : carouselState.viewport.scrollHeight -
        carouselState.viewport.clientHeight;
  return Math.max(0, Math.min(target, Math.max(0, max)));
}

function setScroll(target: number, jump = false) {
  if (!carouselState.viewport) return;
  carouselState.viewport.scrollTo(
    carouselState.orientation === 'horizontal'
      ? { left: target, behavior: jump ? 'auto' : 'smooth' }
      : { top: target, behavior: jump ? 'auto' : 'smooth' },
  );
}

function scrollPrev() {
  if (!carouselState.viewport) return;
  const index = Math.max(0, carouselState.selectedIndex - 1);
  scrollTo(index);
}

function scrollNext() {
  const slides = getSlides();
  if (!slides.length) return;
  const index = Math.min(slides.length - 1, carouselState.selectedIndex + 1);
  scrollTo(index);
}

function scrollTo(index: number, jump?: boolean) {
  setScroll(getTargetFor(index), jump);
}

function refresh() {
  const slides = getSlides();
  carouselState.scrollSnaps = slides.map((_, index) => getTargetFor(index));

  if (!carouselState.viewport || !slides.length) {
    carouselState.selectedIndex = 0;
    carouselState.canScrollPrev = false;
    carouselState.canScrollNext = false;
    emitSelect();
    return;
  }

  const scrollPosition =
    carouselState.orientation === 'horizontal'
      ? carouselState.viewport.scrollLeft
      : carouselState.viewport.scrollTop;

  let nearestIndex = 0;
  let nearestDistance = Number.POSITIVE_INFINITY;
  for (let index = 0; index < carouselState.scrollSnaps.length; index += 1) {
    const distance = Math.abs(
      carouselState.scrollSnaps[index] - scrollPosition,
    );
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestIndex = index;
    }
  }

  carouselState.selectedIndex = nearestIndex;
  carouselState.canScrollPrev = nearestIndex > 0;
  carouselState.canScrollNext = nearestIndex < slides.length - 1;
  emitSelect();
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    e.preventDefault();
    scrollPrev();
  } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    e.preventDefault();
    scrollNext();
  }
}
function setViewport(node: HTMLDivElement | null) {
  carouselState.viewport = node;
  refresh();
}

$effect(() => {
  carouselState.orientation = orientation;
  carouselState.align = align ?? 'center';
  setApi(api);
});

$effect(() => {
  if (!carouselState.viewport) return;
  const onScroll = () => {
    refresh();
  };
  carouselState.viewport.addEventListener('scroll', onScroll, {
    passive: true,
  });

  const resizeObserver = new ResizeObserver(() => {
    refresh();
  });
  resizeObserver.observe(carouselState.viewport);
  for (const slide of getSlides()) {
    resizeObserver.observe(slide);
  }

  const mutationObserver = new MutationObserver(() => {
    refresh();
  });
  mutationObserver.observe(carouselState.viewport, {
    childList: true,
    subtree: false,
  });

  return () => {
    carouselState.viewport?.removeEventListener('scroll', onScroll);
    resizeObserver.disconnect();
    mutationObserver.disconnect();
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
