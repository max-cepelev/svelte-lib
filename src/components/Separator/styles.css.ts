import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

const separator = style({
	backgroundColor: theme.colors.border,
	flexShrink: 0,
	selectors: {
		'&[data-orientation=horizontal]': {
			height: '1px',
			width: '100%',
		},
		'&[data-orientation=vertical]': {
			height: '100%',
			width: '1px',
		},
	},
});

export default {
	separator,
};
