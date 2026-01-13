export type { ComplexStyleRule, CSSProperties } from '@vanilla-extract/css';

// biome-ignore lint/suspicious/noExplicitAny: <>
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, 'child'> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;

// biome-ignore lint/suspicious/noExplicitAny: <>
export type WithoutChildren<T> = T extends { children?: any }
	? Omit<T, 'children'>
	: T;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & {
	ref?: U | null;
};
