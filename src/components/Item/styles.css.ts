import {
	type ComplexStyleRule,
	globalStyle,
	style,
	styleVariants,
} from '@vanilla-extract/css';
import { theme } from '~/theme';
import { spacing } from '~/utils';
import type { ItemMediaVariant, ItemSize, ItemVariant } from './types';

export const item = style({
	display: 'flex',
	flexWrap: 'wrap',
	alignItems: 'center',
	borderRadius: theme.borderRadius.md,
	border: '1px solid transparent',
	fontSize: theme.fontSize.sm,
	transition: 'background-color 0.1s, border-color 0.1s, box-shadow 0.1s',
	outline: 'none',
	position: 'relative',
	selectors: {
		'&:focus-visible': {
			borderColor: theme.colors.primary,
			boxShadow: `0 0 0 3px color-mix(in oklch, ${theme.colors.primary} 20%, transparent)`,
		},
		'&[href]:hover': {
			backgroundColor: `color-mix(in oklch, ${theme.colors.background.elementHover} 50%, transparent)`,
		},
	},
});

export const itemVariants = styleVariants<
	Record<ItemVariant, ComplexStyleRule>
>({
	default: {
		backgroundColor: 'transparent',
	},
	outline: {
		borderColor: theme.colors.border,
	},
	muted: {
		backgroundColor: `color-mix(in oklch, ${theme.colors.background.element} 50%, transparent)`,
	},
});

export const itemSizes = styleVariants<Record<ItemSize, ComplexStyleRule>>({
	default: {
		gap: theme.spacing[4],
		padding: theme.spacing[4],
	},
	small: {
		gap: theme.spacing[2],
		padding: spacing(3, 4),
	},
});

export const header = style({
	display: 'flex',
	flexBasis: '100%',
	alignItems: 'center',
	justifyContent: 'space-between',
	gap: theme.spacing[2],
});

export const footer = style([header]);

export const title = style({
	display: 'flex',
	width: 'fit-content',
	alignItems: 'center',
	gap: theme.spacing[2],
	fontSize: theme.fontSize.sm,
	lineHeight: theme.lineHeight.snug,
	fontWeight: theme.fontWeight.medium,
});

export const description = style({
	color: theme.colors.text.secondary,
	fontSize: theme.fontSize.sm,
	lineHeight: theme.lineHeight.normal,
	fontWeight: theme.fontWeight.normal,
	display: '-webkit-box',
	WebkitLineClamp: 2,
	WebkitBoxOrient: 'vertical',
	overflow: 'hidden',
});

globalStyle(`${description} > a`, {
	textDecoration: 'underline',
	textUnderlineOffset: '4px',
});

globalStyle(`${description} > a:hover`, {
	color: theme.colors.primary,
});

export const content = style({
	display: 'flex',
	flex: 1,
	flexDirection: 'column',
	gap: theme.spacing[1],
});

// If there are multiple content slots, only the first one grows
globalStyle(`${content} + [data-slot=item-content]`, {
	flex: 'none',
});

export const actions = style({
	display: 'flex',
	alignItems: 'center',
	gap: theme.spacing[2],
});

export const media = style({
	display: 'flex',
	flexShrink: 0,
	alignItems: 'center',
	justifyContent: 'center',
	gap: theme.spacing[2],
	selectors: {
		[`${item}:has([data-slot=item-description]) &`]: {
			transform: 'translateY(2px)',
			alignSelf: 'flex-start',
		},
	},
});

globalStyle(`${media} svg`, {
	pointerEvents: 'none',
});

export const mediaVariants = styleVariants<
	Record<ItemMediaVariant, ComplexStyleRule>
>({
	default: {
		backgroundColor: 'transparent',
	},
	icon: {
		backgroundColor: theme.colors.background.element,
		width: theme.spacing[8],
		height: theme.spacing[8],
		borderRadius: theme.borderRadius.sm,
		border: `1px solid ${theme.colors.border}`,
	},
	image: {
		width: theme.spacing[10],
		height: theme.spacing[10],
		overflow: 'hidden',
		borderRadius: theme.borderRadius.sm,
	},
});

globalStyle(`${mediaVariants.icon} svg:not([class*='size-'])`, {
	width: theme.spacing[4],
	height: theme.spacing[4],
});

globalStyle(`${mediaVariants.image} img`, {
	width: '100%',
	height: '100%',
	objectFit: 'cover',
});

export const group = style({
	display: 'flex',
	flexDirection: 'column',
});

export default {
	item,
	itemVariants,
	itemSizes,
	header,
	footer,
	title,
	description,
	content,
	actions,
	media,
	mediaVariants,
	group,
};
