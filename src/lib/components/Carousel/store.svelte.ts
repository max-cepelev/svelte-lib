import {
	createScrollSnapModel,
	findNearestSnapIndex,
	getScrollTarget,
} from './scrollModel';
import type {
	CarouselAlign,
	CarouselApi,
	CarouselContext,
	CarouselEventCallback,
	CarouselEventName,
	CarouselOrientation,
} from './types';

type CarouselStoreOptions = {
	align: CarouselAlign;
	initialIndex: number;
	loop: boolean;
	orientation: CarouselOrientation;
};

type ListenerMap = Record<CarouselEventName, Set<CarouselEventCallback>>;

function getLayoutOffset(
	element: HTMLElement,
	orientation: CarouselOrientation,
) {
	const offsetProperty =
		orientation === 'horizontal' ? 'offsetLeft' : 'offsetTop';
	let offset = 0;
	let current: HTMLElement | null = element;

	while (current) {
		offset += current[offsetProperty];
		current = current.offsetParent as HTMLElement | null;
	}

	return offset;
}

export class CarouselStore implements CarouselContext {
	readonly api: CarouselApi;
	viewport: HTMLDivElement | null = null;
	align = $state<CarouselAlign>('center');
	orientation = $state<CarouselOrientation>('horizontal');
	canScrollNext = $state(false);
	canScrollPrev = $state(false);
	scrollSnaps = $state<number[]>([]);
	selectedIndex = $state(0);

	#loop = false;
	readonly #initialIndex: number;
	#didApplyInitialIndex = false;
	#slideToSnap: number[] = [];
	#navigationSnap = 0;
	#pendingNavigationSnap: number | null = null;
	#animationFrame: number | null = null;
	readonly #listeners: ListenerMap = {
		reInit: new Set(),
		select: new Set(),
	};
	#resizeObserver: ResizeObserver | null = null;
	#mutationObserver: MutationObserver | null = null;
	#observedSlides: HTMLElement[] = [];

	readonly #onScroll = () => {
		if (this.#animationFrame !== null) return;

		if (typeof requestAnimationFrame === 'undefined') {
			this.#updateScrollState();
			return;
		}

		this.#animationFrame = requestAnimationFrame(() => {
			this.#animationFrame = null;
			this.#updateScrollState();
		});
	};

	readonly #onScrollEnd = () => {
		this.#pendingNavigationSnap = null;
		this.#navigationSnap = this.selectedIndex;
	};

	constructor({
		align,
		initialIndex,
		loop,
		orientation,
	}: CarouselStoreOptions) {
		this.align = align;
		this.orientation = orientation;
		this.#loop = loop;
		this.#initialIndex = initialIndex;

		const carouselApi: CarouselApi = {
			scrollPrev: () => {
				const lastSnapIndex = this.scrollSnaps.length - 1;
				const targetIndex =
					this.#loop && this.#navigationSnap === 0
						? lastSnapIndex
						: this.#navigationSnap - 1;

				carouselApi.scrollToSnap(targetIndex);
			},
			scrollNext: () => {
				const lastSnapIndex = this.scrollSnaps.length - 1;
				const targetIndex =
					this.#loop && this.#navigationSnap === lastSnapIndex
						? 0
						: this.#navigationSnap + 1;

				carouselApi.scrollToSnap(targetIndex);
			},
			scrollTo: (index, jump = false) => {
				if (this.#slideToSnap.length === 0) return;
				const targetSlideIndex = Math.max(
					0,
					Math.min(Math.trunc(index), this.#slideToSnap.length - 1),
				);
				const targetSnapIndex = this.#slideToSnap[targetSlideIndex];

				carouselApi.scrollToSnap(targetSnapIndex, jump);
			},
			scrollToSnap: (index, jump = false) => {
				if (!this.viewport || this.scrollSnaps.length === 0) return;
				const targetIndex = Math.max(
					0,
					Math.min(Math.trunc(index), this.scrollSnaps.length - 1),
				);
				const target = this.scrollSnaps[targetIndex];
				this.#navigationSnap = targetIndex;
				this.#pendingNavigationSnap = jump ? null : targetIndex;
				this.#setScroll(target, jump);
			},
			canScrollNext: () => this.canScrollNext,
			canScrollPrev: () => this.canScrollPrev,
			selectedScrollSnap: () => this.selectedIndex,
			scrollSnapList: () => [...this.scrollSnaps],
			on: (event, callback) => {
				this.#listeners[event].add(callback);
				return carouselApi;
			},
			off: (event, callback) => {
				this.#listeners[event].delete(callback);
				return carouselApi;
			},
			reInit: () => {
				this.#rebindSlideObservers();
				this.#refresh();
				this.#emit('reInit');
			},
		};

		this.api = carouselApi;
	}

	handleKeyDown = (event: KeyboardEvent) => {
		if (event.defaultPrevented) return;

		const target = event.target;
		if (
			target instanceof HTMLElement &&
			(target.isContentEditable ||
				['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) ||
				target.closest('[role="slider"]'))
		) {
			return;
		}

		const isHorizontal = this.orientation === 'horizontal';
		const previousKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';
		const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';

		if (event.key === previousKey) {
			event.preventDefault();
			this.scrollPrev();
		} else if (event.key === nextKey) {
			event.preventDefault();
			this.scrollNext();
		}
	};

	setViewport = (node: HTMLDivElement | null) => {
		if (this.viewport === node) return;
		this.#detachViewport();
		this.viewport = node;
		if (!node) {
			this.#refresh();
			return;
		}

		node.addEventListener('scroll', this.#onScroll, { passive: true });
		node.addEventListener('scrollend', this.#onScrollEnd);

		if (typeof ResizeObserver !== 'undefined') {
			this.#resizeObserver = new ResizeObserver(() => this.#refresh());
			this.#resizeObserver.observe(node);
		}

		if (typeof MutationObserver !== 'undefined') {
			this.#mutationObserver = new MutationObserver(() => this.api.reInit());
			this.#mutationObserver.observe(node, {
				childList: true,
				subtree: false,
			});
		}

		this.api.reInit();

		if (!this.#didApplyInitialIndex) {
			this.#didApplyInitialIndex = true;
			this.api.scrollTo(this.#initialIndex, true);
			this.#updateScrollState();
		}
	};

	updateOptions = ({
		align,
		loop,
		orientation,
	}: Pick<CarouselStoreOptions, 'align' | 'loop' | 'orientation'>) => {
		const didChange =
			this.align !== align ||
			this.orientation !== orientation ||
			this.#loop !== loop;

		this.align = align;
		this.orientation = orientation;
		this.#loop = loop;

		return didChange;
	};

	scrollPrev = () => this.api.scrollPrev();
	scrollNext = () => this.api.scrollNext();

	destroy = () => {
		this.#detachViewport();
		this.viewport = null;
		this.#listeners.reInit.clear();
		this.#listeners.select.clear();
	};

	#getSlides = () => {
		if (!this.viewport) return [];
		return Array.from(this.viewport.children).filter(
			(slide): slide is HTMLElement =>
				slide instanceof HTMLElement && slide.dataset.slot === 'carousel-item',
		);
	};

	#getScrollSnapModel = () => {
		if (!this.viewport) return createScrollSnapModel([]);

		const isHorizontal = this.orientation === 'horizontal';
		const viewportSize = isHorizontal
			? this.viewport.clientWidth
			: this.viewport.clientHeight;
		const maxScroll = isHorizontal
			? this.viewport.scrollWidth - this.viewport.clientWidth
			: this.viewport.scrollHeight - this.viewport.clientHeight;
		const viewportOffset = getLayoutOffset(this.viewport, this.orientation);
		const slideTargets = this.#getSlides().map((slide) => {
			const slideStart =
				getLayoutOffset(slide, this.orientation) - viewportOffset;
			const slideSize = isHorizontal ? slide.offsetWidth : slide.offsetHeight;

			return getScrollTarget({
				align: this.align,
				maxScroll,
				slideSize,
				slideStart,
				viewportSize,
			});
		});

		return createScrollSnapModel(slideTargets);
	};

	#refresh = () => {
		const { scrollSnaps, slideToSnap } = this.#getScrollSnapModel();
		this.scrollSnaps = scrollSnaps;
		this.#slideToSnap = slideToSnap;
		this.#navigationSnap = Math.min(
			this.#navigationSnap,
			Math.max(0, scrollSnaps.length - 1),
		);
		this.#updateScrollState();
	};

	#updateScrollState = () => {
		const previousSelectedIndex = this.selectedIndex;

		if (!this.viewport || this.scrollSnaps.length === 0) {
			this.selectedIndex = 0;
			this.canScrollPrev = false;
			this.canScrollNext = false;

			if (previousSelectedIndex !== 0) this.#emit('select');
			return;
		}

		const scrollPosition =
			this.orientation === 'horizontal'
				? this.viewport.scrollLeft
				: this.viewport.scrollTop;
		const nearestIndex = findNearestSnapIndex(this.scrollSnaps, scrollPosition);
		const canLoop = this.#loop && this.scrollSnaps.length > 1;

		this.selectedIndex = nearestIndex;
		this.canScrollPrev = canLoop || nearestIndex > 0;
		this.canScrollNext = canLoop || nearestIndex < this.scrollSnaps.length - 1;

		if (this.#pendingNavigationSnap === null) {
			this.#navigationSnap = nearestIndex;
		}
		if (previousSelectedIndex !== nearestIndex) this.#emit('select');
	};

	#setScroll = (target: number, jump = false) => {
		if (!this.viewport) return;
		this.viewport.scrollTo(
			this.orientation === 'horizontal'
				? { left: target, behavior: jump ? 'auto' : 'smooth' }
				: { top: target, behavior: jump ? 'auto' : 'smooth' },
		);
	};

	#emit = (event: CarouselEventName) => {
		for (const callback of this.#listeners[event]) callback(this.api);
	};

	#detachViewport = () => {
		if (this.viewport) {
			this.viewport.removeEventListener('scroll', this.#onScroll);
			this.viewport.removeEventListener('scrollend', this.#onScrollEnd);
		}
		if (
			this.#animationFrame !== null &&
			typeof cancelAnimationFrame !== 'undefined'
		) {
			cancelAnimationFrame(this.#animationFrame);
		}
		this.#animationFrame = null;
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
