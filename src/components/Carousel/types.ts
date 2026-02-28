import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '../../types.ts';
export type CarouselAlign = 'start' | 'center' | 'end';

export type CarouselOptions = {
	align?: CarouselAlign;
	[key: string]: unknown;
};

export type CarouselPlugins = unknown[];

type CarouselEventName = 'select';
type CarouselEventCallback = () => void;

export type CarouselAPI = {
	scrollPrev: () => void;
	scrollNext: () => void;
	scrollTo: (index: number, jump?: boolean) => void;
	canScrollNext: () => boolean;
	canScrollPrev: () => boolean;
	selectedScrollSnap: () => number;
	scrollSnapList: () => number[];
	on: (event: CarouselEventName, callback: CarouselEventCallback) => void;
	off: (event: CarouselEventName, callback: CarouselEventCallback) => void;
};

export interface CarouselProps
	extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
	setApi?: (api: CarouselAPI | undefined) => void;
	orientation?: 'horizontal' | 'vertical';
	align?: CarouselAlign;
}

export type CarouselContext = {
	api: CarouselAPI | undefined;
	viewport: HTMLDivElement | null;
	align: CarouselAlign;
	orientation: 'horizontal' | 'vertical';
	scrollNext: () => void;
	scrollPrev: () => void;
	canScrollNext: boolean;
	canScrollPrev: boolean;
	handleKeyDown: (e: KeyboardEvent) => void;
	setViewport: (node: HTMLDivElement | null) => void;
	refresh: () => void;
	scrollTo: (index: number, jump?: boolean) => void;
	scrollSnaps: number[];
	selectedIndex: number;
};
