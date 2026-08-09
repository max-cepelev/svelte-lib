import type { SvelteHTMLElements } from 'svelte/elements';
import type { WithElementRef } from '../../types.ts';
export type CarouselAlign = 'start' | 'center' | 'end';
export type CarouselOrientation = 'horizontal' | 'vertical';

export type CarouselEventName = 'reInit' | 'select';
export type CarouselEventCallback = (api: CarouselApi) => void;

export type CarouselApi = {
	scrollPrev: () => void;
	scrollNext: () => void;
	scrollTo: (index: number, jump?: boolean) => void;
	scrollToSnap: (index: number, jump?: boolean) => void;
	canScrollNext: () => boolean;
	canScrollPrev: () => boolean;
	selectedScrollSnap: () => number;
	scrollSnapList: () => number[];
	on: (
		event: CarouselEventName,
		callback: CarouselEventCallback,
	) => CarouselApi;
	off: (
		event: CarouselEventName,
		callback: CarouselEventCallback,
	) => CarouselApi;
	reInit: () => void;
};

/** @deprecated Use `CarouselApi` instead. */
export type CarouselAPI = CarouselApi;

export interface CarouselProps
	extends WithElementRef<SvelteHTMLElements['section'], HTMLElement> {
	align?: CarouselAlign;
	initialIndex?: number;
	loop?: boolean;
	orientation?: CarouselOrientation;
	setApi?: (api: CarouselApi | undefined) => void;
}

export type CarouselContext = {
	api: CarouselApi;
	viewport: HTMLDivElement | null;
	align: CarouselAlign;
	orientation: CarouselOrientation;
	scrollNext: () => void;
	scrollPrev: () => void;
	canScrollNext: boolean;
	canScrollPrev: boolean;
	handleKeyDown: (e: KeyboardEvent) => void;
	setViewport: (node: HTMLDivElement | null) => void;
	scrollSnaps: number[];
	selectedIndex: number;
};
