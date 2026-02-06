import { globalStyle, style } from '@vanilla-extract/css';
import { theme } from '~/theme';

const unchecked = style({
	color: 'transparent',
});

const root = style({
	position: 'relative',
	display: 'flex',
	alignItems: 'center',
	gap: theme.spacing[2], // gap-2
	paddingTop: '0.375rem', // py-1.5
	paddingBottom: '0.375rem',
	paddingLeft: theme.spacing[8], // ps-8
	paddingRight: theme.spacing[2], // pe-2
	borderRadius: theme.borderRadius.sm,
	fontSize: theme.fontSize.sm,
	cursor: 'default',
	userSelect: 'none',
	outline: 'none',

	selectors: {
		'&:focus': {
			backgroundColor: theme.colors.background.elementHover,
			color: theme.colors.foreground.secondary,
		},

		'&[data-disabled]': {
			pointerEvents: 'none',
			opacity: 0.5,
		},
	},
});

globalStyle(`${root} svg`, {
	pointerEvents: 'none',
	flexShrink: 0,

	width: theme.spacing[4],
	height: theme.spacing[4],
});

const iconWrapper = style({
	position: 'absolute',
	left: theme.spacing[2], // start-2
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	pointerEvents: 'none',

	width: '0.875rem', // size-3.5
	height: '0.875rem',
});

export default {
	root,
	iconWrapper,
	unchecked,
};
