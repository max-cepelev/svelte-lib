import type {
	CarouselAlign,
	CarouselAPI,
	CarouselContext,
	CarouselOrientation,
	CarouselProps,
} from './types';

export class CarouselStore implements CarouselContext {
	api = $state<CarouselAPI | undefined>(undefined);
	viewport = $state<HTMLDivElement | null>(null);
	align = $state<CarouselAlign>('center');
	orientation = $state<CarouselOrientation>('horizontal');
	canScrollNext = $state(false);
	canScrollPrev = $state(false);
	scrollSnaps = $state<number[]>([]);
	selectedIndex = $state(0);

	readonly #listeners = new Set<() => void>();
	#resizeObserver: ResizeObserver | null = null;
	#mutationObserver: MutationObserver | null = null;
	#observedSlides: HTMLElement[] = [];
	readonly #onScroll = () => this.refresh();

	constructor({
		orientation = 'horizontal',
		align = 'center',
	}: Pick<CarouselProps, 'orientation' | 'align'>) {
		this.align = align;
		this.orientation = orientation;
		this.api = {
			scrollPrev: this.scrollPrev,
			scrollNext: this.scrollNext,
			scrollTo: this.scrollTo,
			canScrollNext: () => this.canScrollNext,
			canScrollPrev: () => this.canScrollPrev,
			selectedScrollSnap: () => this.selectedIndex,
			scrollSnapList: () => this.scrollSnaps,
			on: (event, callback) => {
				if (event !== 'select') return;
				this.#listeners.add(callback);
			},
			off: (event, callback) => {
				if (event !== 'select') return;
				this.#listeners.delete(callback);
			},
		};
	}

	handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
			e.preventDefault();
			this.scrollPrev();
		} else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
			e.preventDefault();
			this.scrollNext();
		}
	};

	setViewport = (node: HTMLDivElement | null) => {
		if (this.viewport === node) return;
		this.#detachViewport();
		this.viewport = node;
		if (!node) {
			this.refresh();
			return;
		}

		node.addEventListener('scroll', this.#onScroll, { passive: true });
		this.#resizeObserver = new ResizeObserver(() => this.refresh());
		this.#resizeObserver.observe(node);

		this.#mutationObserver = new MutationObserver(() => {
			this.#rebindSlideObservers();
			this.refresh();
		});
		this.#mutationObserver.observe(node, { childList: true, subtree: false });

		this.#rebindSlideObservers();
		this.refresh();
	};

	scrollPrev = () => {
		if (!this.viewport) return;
		const index = Math.max(0, this.selectedIndex - 1);
		this.scrollTo(index);
	};

	scrollNext = () => {
		const slides = this.#getSlides();
		if (!slides.length) return;
		const index = Math.min(slides.length - 1, this.selectedIndex + 1);
		this.scrollTo(index);
	};

	scrollTo = (index: number, jump?: boolean) => {
		this.#setScroll(this.#getTargetFor(index), jump);
	};

	refresh = () => {
		const slides = this.#getSlides();
		this.scrollSnaps = slides.map((_, index) => this.#getTargetFor(index));

		if (!this.viewport || !slides.length) {
			this.selectedIndex = 0;
			this.canScrollPrev = false;
			this.canScrollNext = false;
			this.#emitSelect();
			return;
		}

		const scrollPosition =
			this.orientation === 'horizontal'
				? this.viewport.scrollLeft
				: this.viewport.scrollTop;

		let nearestIndex = 0;
		let nearestDistance = Number.POSITIVE_INFINITY;
		for (let index = 0; index < this.scrollSnaps.length; index += 1) {
			const distance = Math.abs(this.scrollSnaps[index] - scrollPosition);
			if (distance < nearestDistance) {
				nearestDistance = distance;
				nearestIndex = index;
			}
		}

		this.selectedIndex = nearestIndex;
		this.canScrollPrev = nearestIndex > 0;
		this.canScrollNext = nearestIndex < slides.length - 1;
		this.#emitSelect();
	};

	destroy = () => {
		this.#detachViewport();
		this.#listeners.clear();
	};

	#getSlides = () => {
		if (!this.viewport) return [];
		return Array.from(
			this.viewport.querySelectorAll<HTMLElement>(
				'[data-slot="carousel-item"]',
			),
		);
	};

	#getTargetFor = (index: number) => {
		if (!this.viewport) return 0;
		const slides = this.#getSlides();
		const slide = slides[index];
		if (!slide) return 0;

		const viewportSize =
			this.orientation === 'horizontal'
				? this.viewport.clientWidth
				: this.viewport.clientHeight;
		const slideSize =
			this.orientation === 'horizontal'
				? slide.offsetWidth
				: slide.offsetHeight;
		const slideStart =
			this.orientation === 'horizontal' ? slide.offsetLeft : slide.offsetTop;

		let target = slideStart;
		if (this.align === 'center') {
			target = slideStart - (viewportSize - slideSize) / 2;
		} else if (this.align === 'end') {
			target = slideStart - (viewportSize - slideSize);
		}

		const max =
			this.orientation === 'horizontal'
				? this.viewport.scrollWidth - this.viewport.clientWidth
				: this.viewport.scrollHeight - this.viewport.clientHeight;
		return Math.max(0, Math.min(target, Math.max(0, max)));
	};

	#setScroll = (target: number, jump = false) => {
		if (!this.viewport) return;
		this.viewport.scrollTo(
			this.orientation === 'horizontal'
				? { left: target, behavior: jump ? 'auto' : 'smooth' }
				: { top: target, behavior: jump ? 'auto' : 'smooth' },
		);
	};

	#emitSelect = () => {
		for (const callback of this.#listeners) callback();
	};

	#detachViewport = () => {
		if (this.viewport) {
			this.viewport.removeEventListener('scroll', this.#onScroll);
		}
		this.#resizeObserver?.disconnect();
		this.#mutationObserver?.disconnect();
		this.#resizeObserver = null;
		this.#mutationObserver = null;
		this.#observedSlides = [];
	};

	#rebindSlideObservers = () => {
		if (!this.#resizeObserver) return;
		for (const slide of this.#observedSlides) {
			this.#resizeObserver.unobserve(slide);
		}
		this.#observedSlides = this.#getSlides();
		for (const slide of this.#observedSlides) {
			this.#resizeObserver.observe(slide);
		}
	};
}
