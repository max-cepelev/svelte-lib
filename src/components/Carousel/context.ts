import { getContext, hasContext, setContext } from 'svelte';
import type { EmblaContext } from './types.js';

const EMBLA_CAROUSEL_CONTEXT = Symbol('EMBLA_CAROUSEL_CONTEXT');

export function setEmblaContext(config: EmblaContext): EmblaContext {
	setContext(EMBLA_CAROUSEL_CONTEXT, config);
	return config;
}

export function getEmblaContext(name = 'This component') {
	if (!hasContext(EMBLA_CAROUSEL_CONTEXT)) {
		throw new Error(`${name} must be used within a <Carousel.Root> component`);
	}
	return getContext<EmblaContext>(EMBLA_CAROUSEL_CONTEXT);
}
