import { style, theme } from '~/styles/index.js';

const subTrigger = style({
	display: 'flex',
	cursor: 'default',
	alignItems: 'center',
	gap: theme.spacing[2],
	borderRadius: theme.borderRadius.sm,
	paddingLeft: theme.spacing[2],
	paddingRight: theme.spacing[2],
	paddingTop: '0.375rem',
	paddingBottom: '0.375rem',
	fontSize: theme.fontSize.sm,
	outline: '2px solid transparent',
	outlineOffset: '2px',
	userSelect: 'none',
	selectors: {
		'&[data-highlighted], &[data-state=open]': {
			backgroundColor: theme.colors.background.elementHover,
			color: theme.colors.text.primary,
		},
		'&[data-disabled]': {
			pointerEvents: 'none',
			opacity: 0.5,
		},
		'&[data-inset]': {
			paddingInlineStart: theme.spacing[8],
		},
	},
});

const icon = style({
	marginInlineStart: 'auto',
	width: theme.spacing[4],
	height: theme.spacing[4],
});

export default {
	subTrigger,
	icon,
};
