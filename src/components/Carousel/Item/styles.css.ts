import { style, styleVariants } from '@vanilla-extract/css';

const item = style({
	minWidth: 0,
	flexShrink: 0,
	flexGrow: 0,
	flexBasis: '100%',
});

const orientation = styleVariants({
	horizontal: {
		scrollSnapAlign: 'center',
		scrollSnapStop: 'always',
	},
	vertical: {
		scrollSnapAlign: 'start',
		scrollSnapStop: 'always',
	},
});

export default {
	item,
	orientation,
};
