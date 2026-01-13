import type { HTMLButtonAttributes } from 'svelte/elements';

export type ButtonVariant =
	| 'default'
	| 'destructive'
	| 'outline'
	| 'ghost'
	| 'link';

export type ButtonSize = 'medium' | 'small' | 'large' | 'icon' | 'iconSmall';

export type ButtonProps = HTMLButtonAttributes & {
	variant?: ButtonVariant;
	loading?: boolean;
	fullWidth?: boolean;
	size?: ButtonSize;
	label?: string;
	href?: string;
	ref?: HTMLElement | null;
};
