import {
	type ComplexStyleRule,
	globalStyle,
	style,
	styleVariants,
} from '@vanilla-extract/css';
import { theme } from '../../theme.css.js';
import type { BadgeVariant } from './types.js';

export const badge = style({
	display: 'inline-flex',
	width: 'fit-content',
	flexShrink: 0,
	alignItems: 'center',
	justifyContent: 'center',
	gap: theme.spacing[1],
	overflow: 'hidden',
	borderRadius: '9999px',
	border: '1px solid transparent',
	padding: `2px ${theme.spacing[2]}`,
	fontSize: theme.fontSize.xs,
	fontWeight: theme.fontWeight.medium,
	whiteSpace: 'nowrap',
	transition: 'color 0.2s, background-color 0.2s, box-shadow 0.2s',
	textDecoration: 'none',
	outline: 'none',
	selectors: {
		'&:focus-visible': {
			boxShadow: `0 0 0 2px ${theme.colors.background.paper}, 0 0 0 4px ${theme.colors.primary}`,
		},
	},
});

globalStyle(`${badge} > svg`, {
	pointerEvents: 'none',
	width: theme.spacing[3],
	height: theme.spacing[3],
});

export const badgeVariants = styleVariants<
	Record<BadgeVariant, ComplexStyleRule>
>({
	default: {
		backgroundColor: theme.colors.primary,
		color: theme.colors.foreground.primary,
		selectors: {
			'&[href]:hover': {
				backgroundColor: `color-mix(in oklch, ${theme.colors.primary} 90%, transparent)`,
			},
		},
	},
	secondary: {
		backgroundColor: theme.colors.secondary,
		color: theme.colors.foreground.secondary,
		selectors: {
			'&[href]:hover': {
				backgroundColor: `color-mix(in oklch, ${theme.colors.secondary} 90%, transparent)`,
			},
		},
	},
	destructive: {
		backgroundColor: theme.colors.error,
		color: theme.colors.foreground.primary,
		selectors: {
			'&[href]:hover': {
				backgroundColor: `color-mix(in oklch, ${theme.colors.error} 90%, transparent)`,
			},
		},
	},
	outline: {
		backgroundColor: 'transparent',
		color: theme.colors.text.primary,
		border: `1px solid ${theme.colors.border}`,
		selectors: {
			'&[href]:hover': {
				backgroundColor: theme.colors.background.elementHover,
			},
		},
	},
});

export default {
	badge,
	badgeVariants,
};
