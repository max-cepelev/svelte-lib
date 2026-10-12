import { getContext, setContext } from 'svelte';
import type { TabsVariant } from './types';

const TABS_LIST_CONTEXT = Symbol('tabs-list-context');

type TabsListContext = {
	readonly variant: TabsVariant;
};

export function setTabsListContext(context: TabsListContext) {
	setContext(TABS_LIST_CONTEXT, context);
}

export function getTabsListContext() {
	return getContext<TabsListContext | undefined>(TABS_LIST_CONTEXT);
}
