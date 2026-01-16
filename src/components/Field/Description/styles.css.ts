import { globalStyle, style } from '@vanilla-extract/css';
import { theme } from '../../../theme.css.js';

const root = style({
	color: theme.colors.text.disabled,
	fontSize: theme.fontSize.sm,
	lineHeight: theme.lineHeight.normal,
	fontWeight: theme.fontWeight.normal,
	selectors: {
		'[data-slot=field][data-orientation=horizontal] &': {
			textWrap: 'balance',
		},
		'&:last-child': {
			marginTop: 0,
		},
		'&:nth-last-child(2)': {
			marginTop: `calc(-1 * ${theme.spacing[1]})`,
		},
		'[data-variant=legend] + &': {
			marginTop: `calc(-1.5 * ${theme.spacing[1]})`,
		},
	},
});

globalStyle(`${root} > a`, {
	textDecorationLine: 'underline',
	textUnderlineOffset: '4px',
});

globalStyle(`${root} > a:hover`, {
	color: theme.colors.primary,
});

export default {
	root,
};
