import { globalStyle, style, styleVariants } from '@vanilla-extract/css';
import { theme } from '../../../theme.css.js';

export const button = style({
	position: 'absolute',
	width: theme.spacing[8],
	height: theme.spacing[8],
	borderRadius: '9999px',
});

globalStyle(`${button} span`, {
	visibility: 'hidden',
	width: 0,
	height: 0,
});

globalStyle(`${button} svg`, {
	width: theme.spacing[4],
	height: theme.spacing[4],
});

export const orientation = styleVariants({
	horizontal: {
		left: `calc(-1 * ${theme.spacing[10]})`,
		top: '50%',
		transform: 'translateY(-50%)',
	},
	vertical: {
		left: '50%',
		top: `calc(-1 * ${theme.spacing[10]})`,
		transform: 'translateX(-50%) rotate(90deg)',
	},
});

export default {
	button,
	orientation,
};
