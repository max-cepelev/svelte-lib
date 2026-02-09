import { globalStyle, style } from '@vanilla-extract/css';
import { theme } from '~/theme';
import { spacing } from '~/utils';

const header = style({
	display: 'flex',
});

const trigger = style({
	display: 'flex',
	flex: 1,
	alignItems: 'flex-start',
	justifyContent: 'space-between',
	gap: theme.spacing[4],
	padding: spacing(2),
	borderRadius: theme.borderRadius.sm,
	textAlign: 'start',
	transitionProperty: 'all',
	transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
	transitionDuration: '150ms',
	outline: '2px solid transparent',
	outlineOffset: '2px',
	selectors: {
		'&:focus-visible': {
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
