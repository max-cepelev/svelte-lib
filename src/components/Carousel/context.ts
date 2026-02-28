import { getContext, hasContext, setContext } from 'svelte';
import type { CarouselContext } from './types';

const CAROUSEL_CONTEXT = Symbol('CAROUSEL_CONTEXT');

export function setCarouselContext(config: CarouselContext): CarouselContext {
	setContext(CAROUSEL_CONTEXT, config);
	return config;
}

export function getCarouselContext(name = 'This component') {
	if (!hasContext(CAROUSEL_CONTEXT)) {
		throw new Error(`${name} must be used within a <Carousel.Root> component`);
	}
	return getContext<CarouselContext>(CAROUSEL_CONTEXT);
}
