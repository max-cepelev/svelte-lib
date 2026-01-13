import { style, theme } from '~/styles/index.js';

const item = style({
	position: 'relative',
	display: 'flex',
	cursor: 'default',
	alignItems: 'center',
	gap: theme.spacing[2],
	borderRadius: theme.borderRadius.sm,
	paddingTop: '0.375rem',
	paddingBottom: '0.375rem',
	paddingInlineStart: theme.spacing[8],
	paddingInlineEnd: theme.spacing[2],
	fontSize: theme.fontSize.sm,
	outline: '2px solid transparent',
	outlineOffset: '2px',
	userSelect: 'none',
	selectors: {
		'&:focus': {
			backgroundColor: theme.colors.background.elementHover,
			color: theme.colors.text.primary,
		},
		'&[data-disabled]': {
			pointerEvents: 'none',
			opacity: 0.5,
		},
	},
});

const indicator = style({
	pointerEvents: 'none',
	position: 'absolute',
	insetInlineStart: theme.spacing[2],
	display: 'flex',
	width: '0.875rem',
	height: '0.875rem',
	alignItems: 'center',
	justifyContent: 'center',
});

const icon = style({
	width: theme.spacing[2],
	height: theme.spacing[2],
	fill: 'currentColor',
});

export default {
	item,
	indicator,
	icon,
};
