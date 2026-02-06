import { globalStyle, style } from '@vanilla-extract/css';
import { theme } from '~/theme';
import { spacing } from '~/utils';

export const root = style({
	display: 'flex',
	flexDirection: 'column',
	gap: theme.spacing[2],
});

export const list = style({
	backgroundColor: theme.colors.background.paper,
	color: theme.colors.text.secondary,
	display: 'inline-flex',
	height: theme.spacing[10],
	width: 'fit-content',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: theme.borderRadius.md,
	boxShadow: theme.shadow[3],
	padding: theme.spacing[1],
	gap: theme.spacing[1],
});

export const trigger = style({
	color: theme.colors.text.primary,
	display: 'inline-flex',
	height: 'calc(100% - 1px)',
	flex: 1,
	alignItems: 'center',
	justifyContent: 'center',
	gap: theme.spacing[1],
	borderRadius: theme.borderRadius.md,
	border: '1px solid transparent',
	padding: spacing(1, 2),
	fontSize: theme.fontSize.sm,
	fontWeight: theme.fontWeight.medium,
	whiteSpace: 'nowrap',
	transition: 'color 0.2s, background-color 0.2s, box-shadow 0.2s',
	cursor: 'pointer',
	outline: 'none',
	selectors: {
		'&[data-state=active]': {
			backgroundColor: theme.colors.primary,
			color: theme.colors.foreground.primary,
			boxShadow: theme.shadow[1],
		},
		'&:focus-visible': {
			borderColor: theme.colors.primary,
			boxShadow: `0 0 0 3px color-mix(in oklch, ${theme.colors.primary} 20%, transparent)`,
			outline: `1px solid ${theme.colors.primary}`,
		},
		'&:disabled': {
			pointerEvents: 'none',
			opacity: 0.5,
		},
	},
});

globalStyle(`${trigger} svg`, {
	pointerEvents: 'none',
	flexShrink: 0,
});

globalStyle(`${trigger} svg:not([class*='size-'])`, {
	width: theme.spacing[4],
	height: theme.spacing[4],
});

export const content = style({
	flex: 1,
	outline: 'none',
});

export default {
	root,
	list,
	trigger,
	content,
};
