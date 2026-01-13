import { globalStyle, style, theme } from '~/styles/index.js';

const day = style({
	display: 'flex',
	width: 'var(--cell-size)',
	height: 'var(--cell-size)',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	gap: theme.spacing[1],
	padding: 0,
	whiteSpace: 'nowrap',
	userSelect: 'none',
	':focus': {
		position: 'relative',
	},
	selectors: {
		'&[data-selected]': {
			backgroundColor: theme.colors.primary,
			color: theme.colors.foreground.primary,
		},
		'&[data-today]': {
			textDecoration: 'underline',
			textUnderlineOffset: theme.spacing[1],
			textDecorationThickness: 2,
		},
		'&[data-disabled]': {
			color: theme.colors.text.secondary,
			pointerEvents: 'none',
			opacity: 0.5,
		},
		'&[data-unavailable]': {
			color: theme.colors.text.secondary,
			textDecoration: 'line-through',
		},
	},
});

globalStyle(`${day} > span`, {
	fontSize: theme.fontSize.xs,
	opacity: 0.7,
});

// globalStyle(`${day}[data-today][data-selected]`, {
// 	textDecoration: 'underline',
// });

globalStyle(`${day}[data-today][data-disabled]`, {
	color: theme.colors.text.hint,
});

globalStyle(`${day}[data-outside-month]:not([data-selected])`, {
	color: theme.colors.text.hint,
});

globalStyle(`${day}[data-outside-month]:not([data-selected]):hover`, {
	color: theme.colors.text.primary,
});

export default {
	day,
};
