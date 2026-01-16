import { globalStyle, style } from '@vanilla-extract/css';
import { theme } from '../../../theme.css.js';

const root = style({
	position: 'relative',
	display: 'flex',
	alignItems: 'center',
	gap: theme.spacing[2],
	cursor: 'default',

	paddingLeft: theme.spacing[2],
	paddingRight: theme.spacing[2],
	paddingTop: '0.375rem', // py-1.5
	paddingBottom: '0.375rem',

	borderRadius: theme.borderRadius.sm,
	fontSize: theme.fontSize.sm,
	userSelect: 'none',
	outline: 'none',

	selectors: {
		/* highlighted */
		'&[data-highlighted]': {
			backgroundColor: theme.colors.background.elementHover,
			color: theme.colors.text.primary,
		},

		/* disabled */
		'&[data-disabled]': {
			pointerEvents: 'none',
			opacity: 0.5,
		},

		/* inset */
		'&[data-inset]': {
			paddingLeft: theme.spacing[8],
		},
	},
});

globalStyle(`${root} svg`, {
	color: theme.colors.text.hint,
	height: theme.spacing[4],
	width: theme.spacing[4],
});

export default {
	root,
};
