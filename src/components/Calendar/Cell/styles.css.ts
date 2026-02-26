import { globalStyle, style } from '@vanilla-extract/css';
import { theme } from '~/theme';

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
	borderTopLeftRadius: theme.radius.medium,
	borderBottomLeftRadius: theme.radius.medium,
});

globalStyle(`${cell}:last-child[data-selected] [data-bits-day]`, {
	borderTopRightRadius: theme.radius.medium,
	borderBottomRightRadius: theme.radius.medium,
});

export default {
	cell,
};
