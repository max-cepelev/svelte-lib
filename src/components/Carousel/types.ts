import type {
	EmblaCarouselSvelteType,
	default as emblaCarouselSvelte,
} from 'embla-carousel-svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '~/types';

export type CarouselAPI =
	NonNullable<
		NonNullable<EmblaCarouselSvelteType['$$_attributes']>['onemblaInit']
	> extends (evt: CustomEvent<infer API>) => void
		? API
		: any;

type EmblaCarouselConfig = NonNullable<
	Parameters<typeof emblaCarouselSvelte>[1]
>;

export type CarouselOptions = EmblaCarouselConfig['options'];
export type CarouselPlugins = EmblaCarouselConfig['plugins'];

export interface CarouselProps
	extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
	options?: CarouselOptions;
	plugins?: CarouselPlugins;
	setApi?: (api: CarouselAPI | undefined) => void;
	orientation?: 'horizontal' | 'vertical';
}

export type EmblaContext = {
	api: CarouselAPI | undefined;
	orientation: 'horizontal' | 'vertical';
	scrollNext: () => void;
	scrollPrev: () => void;
	canScrollNext: boolean;
	canScrollPrev: boolean;
	handleKeyDown: (e: KeyboardEvent) => void;
	options: CarouselOptions;
	plugins: CarouselPlugins;
	onInit: (e: CustomEvent<CarouselAPI>) => void;
	scrollTo: (index: number, jump?: boolean) => void;
	scrollSnaps: number[];
	selectedIndex: number;
};
