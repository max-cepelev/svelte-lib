import { style, styleVariants } from '@vanilla-extract/css';

const item = style({
	minWidth: 0,
	flexShrink: 0,
	flexGrow: 0,
	flexBasis: '100%',
});

const orientation = styleVariants({
	horizontal: {
		scrollSnapStop: 'always',
	},
	vertical: {
		scrollSnapStop: 'always',
	},
});

const alignment = styleVariants({
	start: { scrollSnapAlign: 'start' },
	center: { scrollSnapAlign: 'center' },
	end: { scrollSnapAlign: 'end' },
});

export default {
	item,
	orientation,
	alignment,
};
