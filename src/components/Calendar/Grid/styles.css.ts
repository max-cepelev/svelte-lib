import { style } from '@vanilla-extract/css';
import { theme } from '../../../theme.css.js';

const grid = style({
	marginTop: theme.spacing[4],
	display: 'flex',
	width: '100%',
	borderCollapse: 'collapse',
	flexDirection: 'column',
	gap: theme.spacing[1],
});

export default {
	grid,
};
