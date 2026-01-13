import { globalStyle, style, theme } from '~/styles/index.js';

const cell = style({
	position: 'relative',
	width: 'var(--cell-size)',
	height: 'var(--cell-size)',
	padding: 0,
	textAlign: 'center',
	fontSize: theme.fontSize.sm,
	':focus-within': {
		zIndex: 20,
	},
});

globalStyle(`${cell}:first-child[data-selected] [data-bits-day]`, {
	borderTopLeftRadius: theme.borderRadius.md,
	borderBottomLeftRadius: theme.borderRadius.md,
});

globalStyle(`${cell}:last-child[data-selected] [data-bits-day]`, {
	borderTopRightRadius: theme.borderRadius.md,
	borderBottomRightRadius: theme.borderRadius.md,
});

export default {
	cell,
};
