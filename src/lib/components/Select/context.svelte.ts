import { getContext, setContext } from 'svelte';

const SELECT_CONTEXT = Symbol('select-context');

type SelectContext = {
	readonly type: 'single' | 'multiple';
};

export function setSelectContext(context: SelectContext) {
	setContext(SELECT_CONTEXT, context);
}

export function getSelectContext() {
	return getContext<SelectContext>(SELECT_CONTEXT);
}
