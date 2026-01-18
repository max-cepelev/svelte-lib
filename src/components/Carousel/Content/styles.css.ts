import { style, styleVariants } from '@vanilla-extract/css';
import { theme } from '../../../theme.css.js';

export const contentWrapper = style({
	overflow: 'hidden',
});

export const container = style({
	display: 'flex',
});

export const orientation = styleVariants({
	horizontal: {
		marginLeft: `calc(-1 * ${theme.spacing[4]})`,
		flexDirection: 'row',
	},
	vertical: {
		marginTop: `calc(-1 * ${theme.spacing[4]})`,
		flexDirection: 'column',
	},
});

export default {
	contentWrapper,
	container,
	orientation,
};
