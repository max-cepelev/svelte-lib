import { style, styleVariants } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const item = style({
	minWidth: 0,
	flexShrink: 0,
	flexGrow: 0,
	flexBasis: '100%',
});

export const orientation = styleVariants({
	horizontal: {
		paddingLeft: theme.spacing[4],
	},
	vertical: {
		paddingTop: theme.spacing[4],
	},
});

export default {
	item,
	orientation,
};
