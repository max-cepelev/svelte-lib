import { globalStyle, style } from '@vanilla-extract/css';
import { theme } from '../../../theme.css.js';

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
