import { globalStyle, style } from '@vanilla-extract/css';
import { theme } from '~/theme';

const header = style({
	display: 'flex',
});

const trigger = style({
	display: 'flex',
	flex: 1,
	alignItems: 'flex-start',
	justifyContent: 'space-between',
	gap: theme.spacing[4],
	borderRadius: theme.borderRadius.md,
	paddingTop: theme.spacing[4],
	paddingBottom: theme.spacing[4],
	textAlign: 'start',
	fontSize: theme.fontSize.sm,
	fontWeight: theme.fontWeight.medium,
	transitionProperty: 'all',
	transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
	transitionDuration: '150ms',
	outline: '2px solid transparent',
	outlineOffset: '2px',
	selectors: {
		'&:hover': {
			textDecoration: 'underline',
		},
		'&:focus-visible': {
			// This combines border-ring and ring-ring/50
			boxShadow: `0 0 0 3px ${theme.colors.info}`,
			borderColor: theme.colors.info,
		},
		'&[disabled]': {
			pointerEvents: 'none',
			opacity: 0.5,
		},
	},
});

globalStyle(`${trigger}[data-state=open] > svg`, {
	transform: 'rotate(180deg)',
});

const icon = style({
	color: theme.colors.text.secondary,
	pointerEvents: 'none',
	width: theme.spacing[4],
	height: theme.spacing[4],
	flexShrink: 0,
	transform: 'translateY(0.125rem)',
	transitionProperty: 'transform',
	transitionDuration: '200ms',
});

export default {
	header,
	trigger,
	icon,
};
