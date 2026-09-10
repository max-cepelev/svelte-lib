import { getContext, setContext } from 'svelte';
import type { DescriptionDirection } from './types';

export const DESCRIPTION_CONTEXT_KEY = Symbol('DESCRIPTION_CONTEXT');

export type DescriptionContext = {
	leader: boolean;
	separator: string;
	direction: DescriptionDirection;
};

export function setDescriptionContext(context: DescriptionContext) {
	setContext(DESCRIPTION_CONTEXT_KEY, context);
}

export function getDescriptionContext(): DescriptionContext {
	return (
		getContext<DescriptionContext>(DESCRIPTION_CONTEXT_KEY) || {
			leader: false,
			separator: ':',
			direction: 'default',
		}
	);
}
