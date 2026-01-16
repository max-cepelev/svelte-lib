import { style } from '@vanilla-extract/css';
import { theme } from '../../../theme.css.js';

const root = style({
	display: 'flex',
	flexDirection: 'column',
	gap: theme.spacing[6],
	border: 'none',
	padding: 0,
	selectors: {
		'&:has(>[data-slot=checkbox-group]), &:has(>[data-slot=radio-group])': {
			gap: theme.spacing[3],
		},
	},
});

export default {
	root,
};
