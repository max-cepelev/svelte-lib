import type { ComplexStyleRule } from '@vanilla-extract/css';
import { globalStyle, style, styleVariants } from '@vanilla-extract/css';
import { theme } from '~/theme';
import type { InputGroupAddonAlign } from '../types';

export const addon = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	gap: theme.spacing[2],
	color: theme.colors.text.hint,
	fontSize: theme.fontSize.sm,
	fontWeight: theme.fontWeight.medium,
	paddingBlock: theme.spacing[2],
	paddingInline: theme.spacing[2],
	cursor: 'text',
	userSelect: 'none',
	minHeight: theme.spacing[9],
});

export const align = styleVariants<
	Record<InputGroupAddonAlign, ComplexStyleRule>
>({
	'inline-start': {
		order: -1,
		paddingInlineStart: theme.spacing[3],
	},
	'inline-end': {
		order: 1,
		paddingInlineEnd: theme.spacing[3],
	},
	'block-start': {
		order: -1,
		width: '100%',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		paddingInline: theme.spacing[3],
		paddingBottom: theme.spacing[2],
		borderBottom: `1px solid ${theme.colors.border}`,
		minHeight: 'auto',
	},
	'block-end': {
		order: 1,
		width: '100%',
		justifyContent: 'flex-start',
		alignItems: 'flex-end',
		paddingInline: theme.spacing[3],
		paddingTop: theme.spacing[2],
		borderTop: `1px solid ${theme.colors.border}`,
		minHeight: 'auto',
	},
});

globalStyle(`${addon} > svg`, {
	pointerEvents: 'none',
});

globalStyle(`${addon} > svg:not([class*='size-'])`, {
	width: '1rem',
	height: '1rem',
});

globalStyle(`${addon} > kbd`, {
	borderRadius: `calc(${theme.borderRadius.md} - 4px)`,
});

globalStyle(`[data-slot="input-group"][data-disabled="true"] ${addon}`, {
	opacity: 0.6,
});

export default {
	addon,
	align,
};
