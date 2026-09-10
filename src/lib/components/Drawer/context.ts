import { getContext, setContext } from 'svelte';

export type DrawerContext = {
	close: () => void;
	isOpen: () => boolean;
	isNotCloseable: () => boolean;
};

const drawerContextKey = Symbol('drawer-context');

export const setDrawerContext = (value: DrawerContext) =>
	setContext(drawerContextKey, value);

export const getDrawerContext = () =>
	getContext<DrawerContext>(drawerContextKey);
