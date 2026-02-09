import type { ComplexStyleRule } from '@vanilla-extract/css';
import { globalStyle, style, styleVariants } from '@vanilla-extract/css';
import { theme } from '~/theme';
import type { InputGroupButtonSize } from '../types';

export const base = style({
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	gap: theme.spacing[1],
	boxShadow: 'none',
	fontSize: theme.fontSize.sm,
});

export const sizes = styleVariants<
	Record<InputGroupButtonSize, ComplexStyleRule>
>({
	xs: {
		height: theme.spacing[6],
		paddingInline: theme.spacing[2],
		borderRadius: theme.borderRadius.sm,
	},
	sm: {
		height: theme.spacing[8],
		paddingInline: theme.spacing[3],
		borderRadius: theme.borderRadius.md,
	},
	'icon-xs': {
		height: theme.spacing[6],
		width: theme.spacing[6],
		padding: 0,
		borderRadius: theme.borderRadius.sm,
	},
	'icon-sm': {
		height: theme.spacing[8],
		width: theme.spacing[8],
		padding: 0,
		borderRadius: theme.borderRadius.md,
	},
});

globalStyle(`${base} svg`, {
	pointerEvents: 'none',
});

globalStyle(`${base} svg:not([class*='size-'])`, {
	width: '1rem',
	height: '1rem',
});

export default {
	base,
	sizes,
};
