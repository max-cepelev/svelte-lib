import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

const root = style({
	paddingLeft: theme.spacing[2], // px-2
	paddingRight: theme.spacing[2],
	paddingTop: '0.375rem', // py-1.5
	paddingBottom: '0.375rem',

	fontSize: theme.fontSize.sm,
	fontWeight: theme.fontWeight.semibold,

	selectors: {
		'&[data-inset]': {
			paddingLeft: theme.spacing[8], // ps-8
		},
	},
});

export default {
	root,
};
