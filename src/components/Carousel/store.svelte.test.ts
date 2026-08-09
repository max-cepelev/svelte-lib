import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CarouselStore } from './store.svelte';
import type { CarouselOrientation } from './types';

class FakeElement {
	dataset: Record<string, string> = {};
	children: FakeElement[] = [];
	offsetParent: FakeElement | null = null;
	offsetLeft = 0;
	offsetTop = 0;
	offsetWidth = 0;
	offsetHeight = 0;
	clientWidth = 0;
	clientHeight = 0;
	scrollWidth = 0;
	scrollHeight = 0;
	scrollLeft = 0;
	scrollTop = 0;
	isContentEditable = false;
	tagName = 'DIV';
	readonly scrollTo = vi.fn();
	readonly #listeners = new Map<
		string,
		Set<EventListenerOrEventListenerObject>
	>();

	addEventListener(type: string, listener: EventListenerOrEventListenerObject) {
		const listeners = this.#listeners.get(type) ?? new Set();
		listeners.add(listener);
		this.#listeners.set(type, listeners);
	}

	removeEventListener(
		type: string,
		listener: EventListenerOrEventListenerObject,
	) {
		this.#listeners.get(type)?.delete(listener);
	}

	dispatch(type: string) {
		const event = new Event(type);
		Object.defineProperty(event, 'target', { value: this });
		for (const listener of this.#listeners.get(type) ?? []) {
			if (typeof listener === 'function') listener.call(this, event);
			else listener.handleEvent(event);
		}
	}

	closest() {
		return null;
	}
}

class FakeResizeObserver {
	observe() {}
	unobserve() {}
	disconnect() {}
}

class FakeMutationObserver {
	observe() {}
	disconnect() {}
}

type CreateCarouselOptions = {
	align?: 'start' | 'center' | 'end';
	count?: number;
	initialIndex?: number;
	loop?: boolean;
	orientation?: CarouselOrientation;
	slideSize?: number;
	viewportOffset?: number;
	viewportSize?: number;
};

function createCarousel({
	align = 'center',
	count = 3,
	initialIndex = 0,
	loop = false,
	orientation = 'horizontal',
	slideSize = 100,
	viewportOffset = 0,
	viewportSize = 100,
}: CreateCarouselOptions = {}) {
	const viewport = new FakeElement();
	const offsetParent = new FakeElement();
	const isHorizontal = orientation === 'horizontal';
	viewport.offsetParent = offsetParent;
	viewport.offsetLeft = isHorizontal ? viewportOffset : 0;
	viewport.offsetTop = isHorizontal ? 0 : viewportOffset;
	viewport.clientWidth = isHorizontal ? viewportSize : 100;
	viewport.clientHeight = isHorizontal ? 100 : viewportSize;
	viewport.scrollWidth = isHorizontal ? count * slideSize : 100;
	viewport.scrollHeight = isHorizontal ? 100 : count * slideSize;

	for (let index = 0; index < count; index += 1) {
		const slide = new FakeElement();
		slide.dataset.slot = 'carousel-item';
		slide.offsetParent = offsetParent;
		slide.offsetLeft = isHorizontal ? viewportOffset + index * slideSize : 0;
		slide.offsetTop = isHorizontal ? 0 : viewportOffset + index * slideSize;
		slide.offsetWidth = isHorizontal ? slideSize : 100;
		slide.offsetHeight = isHorizontal ? 100 : slideSize;
		viewport.children.push(slide);
	}

	const store = new CarouselStore({
		align,
		initialIndex,
		loop,
		orientation,
	});
	store.setViewport(viewport as unknown as HTMLDivElement);

	return { store, viewport };
}

beforeEach(() => {
	vi.stubGlobal('HTMLElement', FakeElement);
	vi.stubGlobal('ResizeObserver', FakeResizeObserver);
	vi.stubGlobal('MutationObserver', FakeMutationObserver);
	vi.stubGlobal('requestAnimationFrame', undefined);
});

afterEach(() => {
	vi.unstubAllGlobals();
});

describe('CarouselStore', () => {
	it('uses viewport-relative layout offsets', () => {
		const { store, viewport } = createCarousel({
			count: 16,
			viewportOffset: 480,
		});
		viewport.scrollTo.mockClear();

		store.api.scrollTo(11, true);

		expect(viewport.scrollTo).toHaveBeenLastCalledWith({
			behavior: 'auto',
			left: 1100,
		});
	});

	it('moves backward from a shared terminal snap instead of stalling', () => {
		const { store, viewport } = createCarousel({
			align: 'start',
			count: 10,
			slideSize: 60,
			viewportSize: 200,
		});
		viewport.scrollTo.mockClear();

		store.api.scrollTo(9, true);
		store.api.scrollPrev();

		expect(store.api.scrollSnapList()).toEqual([
			0, 60, 120, 180, 240, 300, 360, 400,
		]);
		expect(viewport.scrollTo).toHaveBeenNthCalledWith(1, {
			behavior: 'auto',
			left: 400,
		});
		expect(viewport.scrollTo).toHaveBeenLastCalledWith({
			behavior: 'smooth',
			left: 360,
		});
	});

	it('chains navigation from the pending smooth-scroll target', () => {
		const { store, viewport } = createCarousel({ count: 16 });
		viewport.scrollTo.mockClear();

		store.api.scrollTo(11);
		store.api.scrollNext();
		store.api.scrollPrev();

		expect(viewport.scrollTo).toHaveBeenNthCalledWith(1, {
			behavior: 'smooth',
			left: 1100,
		});
		expect(viewport.scrollTo).toHaveBeenNthCalledWith(2, {
			behavior: 'smooth',
			left: 1200,
		});
		expect(viewport.scrollTo).toHaveBeenLastCalledWith({
			behavior: 'smooth',
			left: 1100,
		});
	});

	it('wraps vertical navigation when loop is enabled', () => {
		const { store, viewport } = createCarousel({
			loop: true,
			orientation: 'vertical',
		});
		viewport.scrollTo.mockClear();

		store.api.scrollPrev();
		store.api.scrollNext();

		expect(store.api.canScrollPrev()).toBe(true);
		expect(store.api.canScrollNext()).toBe(true);
		expect(viewport.scrollTo).toHaveBeenNthCalledWith(1, {
			behavior: 'smooth',
			top: 200,
		});
		expect(viewport.scrollTo).toHaveBeenLastCalledWith({
			behavior: 'smooth',
			top: 0,
		});
	});

	it('applies the initial slide without smooth scrolling', () => {
		const { viewport } = createCarousel({ initialIndex: 2 });

		expect(viewport.scrollTo).toHaveBeenLastCalledWith({
			behavior: 'auto',
			left: 200,
		});
	});

	it('only includes direct carousel items', () => {
		const { store, viewport } = createCarousel({ count: 2 });
		const nestedSlide = new FakeElement();
		nestedSlide.dataset.slot = 'carousel-item';
		viewport.children[0].children.push(nestedSlide);

		store.api.reInit();

		expect(store.api.scrollSnapList()).toHaveLength(2);
	});

	it('returns a defensive copy of the snap list', () => {
		const { store } = createCarousel();
		const scrollSnaps = store.api.scrollSnapList();

		scrollSnaps.length = 0;

		expect(store.api.scrollSnapList()).toHaveLength(3);
	});

	it('uses orientation-specific keys and ignores editable controls', () => {
		const { store, viewport } = createCarousel();
		const createKeyboardEvent = (key: string, target: FakeElement) => {
			const event = {
				defaultPrevented: false,
				key,
				preventDefault: vi.fn(() => {
					event.defaultPrevented = true;
				}),
				target,
			};
			return event;
		};
		viewport.scrollTo.mockClear();

		const wrongAxisEvent = createKeyboardEvent('ArrowDown', viewport);
		store.handleKeyDown(wrongAxisEvent as unknown as KeyboardEvent);
		expect(viewport.scrollTo).not.toHaveBeenCalled();

		const nextEvent = createKeyboardEvent('ArrowRight', viewport);
		store.handleKeyDown(nextEvent as unknown as KeyboardEvent);
		expect(nextEvent.preventDefault).toHaveBeenCalledOnce();
		expect(viewport.scrollTo).toHaveBeenLastCalledWith({
			behavior: 'smooth',
			left: 100,
		});

		const input = new FakeElement();
		input.tagName = 'INPUT';
		const inputEvent = createKeyboardEvent('ArrowRight', input);
		store.handleKeyDown(inputEvent as unknown as KeyboardEvent);
		expect(viewport.scrollTo).toHaveBeenCalledTimes(1);
	});

	it('exposes chainable events and emits select only when selection changes', () => {
		const { store, viewport } = createCarousel();
		const onSelect = vi.fn();
		const onReInit = vi.fn();

		expect(store.api.on('select', onSelect)).toBe(store.api);
		expect(store.api.on('reInit', onReInit)).toBe(store.api);
		viewport.scrollLeft = 100;
		viewport.dispatch('scroll');
		viewport.dispatch('scroll');
		store.api.reInit();

		expect(onSelect).toHaveBeenCalledTimes(1);
		expect(onSelect).toHaveBeenCalledWith(store.api);
		expect(onReInit).toHaveBeenCalledTimes(1);
		expect(onReInit).toHaveBeenCalledWith(store.api);

		store.api.off('select', onSelect).off('reInit', onReInit);
	});
});
