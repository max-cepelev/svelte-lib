import { style } from '@vanilla-extract/css';
import { theme } from '../../../theme.css.js';

const item = style({
	borderBottom: `1px solid ${theme.colors.border}`,
	selectors: {
		'&:last-child': {
			borderBottom: 'none',
		},
	},
});

export default {
	item,
};
