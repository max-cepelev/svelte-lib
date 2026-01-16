import { style } from '@vanilla-extract/css';
import { theme } from '../../../theme.css.js';

const months = style({
	position: 'relative',
	display: 'flex',
	flexDirection: 'column',
	gap: theme.spacing[4],
	'@media': {
		'(min-width: 768px)': {
			flexDirection: 'row',
		},
	},
});

export default {
	months,
};
