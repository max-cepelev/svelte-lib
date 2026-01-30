import type { Snippet } from 'svelte';

export type TypographyVariant =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'subtitle1'
	| 'subtitle2'
	| 'body1'
	| 'body2'
	| 'caption'
	| 'overline';

export type TypographyAlign = 'left' | 'center' | 'right' | 'justify';

export type ComponentVariant =
	| 'div'
	| 'p'
	| 'span'
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6';

export type TypographyColor =
	| 'primary'
	| 'disabled'
	| 'info'
	| 'secondary'
	| 'success'
	| 'error'
	| 'muted'
	| 'warning';

export type TypographyProps = {
	align?: TypographyAlign;
	variant?: TypographyVariant;
	color?: TypographyColor;
	component?: ComponentVariant;
	display?: 'block' | 'inline';
	weight?: 'normal' | 'bold' | 'medium' | 'semibold';
	transform?: 'lowercase' | 'capitalize' | 'uppercase';
	decoration?: 'none' | 'underline' | 'lineThrough';
	gutterBottom?: boolean;
	children?: Snippet<[]>;
	ref?: HTMLElement | null;
	class?: string;
};
