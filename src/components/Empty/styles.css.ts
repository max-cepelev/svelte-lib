import {
	type ComplexStyleRule,
	globalStyle,
	style,
	styleVariants,
} from '@vanilla-extract/css';
import { theme } from '~/theme';
import type { EmptyMediaVariant } from './types';

export const root = style({
	display: 'flex',
	minWidth: 0,
	flex: 1,
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	gap: theme.spacing[6],
	borderRadius: theme.borderRadius.lg,
	border: `2px dashed ${theme.colors.border}`,
	padding: theme.spacing[6],
	textAlign: 'center',
	textWrap: 'balance',

	'@media': {
		'(min-width: 768px)': {
			padding: theme.spacing[12],
		},
	},
});

export const content = style({
	display: 'flex',
	width: '100%',
	maxWidth: '24rem',
	minWidth: 0,
	flexDirection: 'column',
	alignItems: 'center',
	gap: theme.spacing[4],
	fontSize: theme.fontSize.sm,
	textWrap: 'balance',
});

export const header = style({
	display: 'flex',
	maxWidth: '24rem',
	flexDirection: 'column',
	alignItems: 'center',
	gap: theme.spacing[2],
	textAlign: 'center',
});

export const title = style({
	fontSize: theme.fontSize.lg,
	fontWeight: theme.fontWeight.medium,
	letterSpacing: '-0.025em',
});

export const description = style({
	color: theme.colors.text.secondary,
	fontSize: theme.fontSize.sm,
	lineHeight: theme.lineHeight.relaxed,
});

globalStyle(`${description} > a`, {
	textDecoration: 'underline',
	textUnderlineOffset: '4px',
});

globalStyle(`${description} > a:hover`, {
	color: theme.colors.primary,
});

export const media = style({
	marginBottom: theme.spacing[2],
	display: 'flex',
	flexShrink: 0,
	alignItems: 'center',
	justifyContent: 'center',
});

globalStyle(`${media} svg`, {
	pointerEvents: 'none',
	flexShrink: 0,
});

export const mediaVariants = styleVariants<
	Record<EmptyMediaVariant, ComplexStyleRule>
>({
	default: {
		backgroundColor: 'transparent',
	},
	icon: {
		backgroundColor: theme.colors.background.element,
		color: theme.colors.text.primary,
		display: 'flex',
		width: theme.spacing[10],
		height: theme.spacing[10],
		flexShrink: 0,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: theme.borderRadius.lg,
	},
});

globalStyle(`${mediaVariants.icon} svg:not([class*='size-'])`, {
	width: theme.spacing[6],
	height: theme.spacing[6],
});

export default {
	root,
	content,
	header,
	title,
	description,
	media,
	mediaVariants,
};
