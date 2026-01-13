import { globalStyle, style, theme } from '~/styles/index.js';

const row = style({
	backgroundColor: 'transparent',
	transition: 'background-color 0.2s ease',
});

globalStyle(`${row}:last-child td`, {
	borderBottom: 'none',
});

const selectable = style({
	cursor: 'pointer',
	':hover': {
		backgroundColor: theme.colors.background.elementHover,
	},
});

export default {
	row,
	selectable,
};
