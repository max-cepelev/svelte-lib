import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const separator = style({
	backgroundColor: theme.colors.border,
	position: 'relative',
	margin: '0 !important',
	alignSelf: 'stretch',
	selectors: {
		'&[data-orientation=vertical]': {
			height: 'auto',
		},
	},
});

export default {
	separator,
};
