import { globalStyle, style } from '@vanilla-extract/css';
import { theme } from '~/theme';

const root = style({
	display: 'flex',
	width: 'fit-content',
	alignItems: 'center',
	gap: theme.spacing[2],
	lineHeight: theme.lineHeight.snug,
	fontSize: theme.fontSize.sm,
	cursor: 'pointer',
	selectors: {
		'[data-slot=field][data-disabled=true] &': {
			opacity: 0.5,
		},
		'&:has(>[data-slot=field])': {
			width: '100%',
			flexDirection: 'column',
			borderRadius: theme.borderRadius.md,
			borderWidth: 1,
			borderStyle: 'solid',
			borderColor: theme.colors.border,
		},
		'&:has(>[data-slot=field][data-state=checked])': {
			backgroundColor: `color-mix(in oklch, ${theme.colors.primary} 5%, transparent)`,
			borderColor: theme.colors.primary,
		},
		'&:has(>[data-slot=field][data-state=checked]) html[data-theme="dark"] &': {
			backgroundColor: `color-mix(in oklch, ${theme.colors.primary} 10%, transparent)`,
		},
	},
});

globalStyle(`${root} > [data-slot=field]`, {
	padding: theme.spacing[4],
});

export default {
	root,
};
