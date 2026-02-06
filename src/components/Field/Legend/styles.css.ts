import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

const root = style({
	marginBottom: theme.spacing[2],
	fontWeight: theme.fontWeight.medium,
	selectors: {
		'&[data-variant=legend]': {
			fontSize: theme.fontSize.base,
		},
		'&[data-variant=label]': {
			fontSize: theme.fontSize.sm,
		},
	},
});

export default {
	root,
};
