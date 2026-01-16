import { globalStyle, style } from '@vanilla-extract/css';
import { theme } from '../../../theme.css.js';

const root = style({
	display: 'flex',
	width: '100%',
	flexDirection: 'column',
	gap: theme.spacing[4],
	containerType: 'inline-size',
	containerName: 'field-group',
	selectors: {
		'&[data-slot=checkbox-group], &[data-slot=radio-group]': {
			gap: theme.spacing[3],
		},
	},
});

globalStyle(`${root}  > [data-slot=field-group]`, {
	gap: theme.spacing[4],
});

export default {
	root,
};
