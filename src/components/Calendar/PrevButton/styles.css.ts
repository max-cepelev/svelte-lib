import { style } from '@vanilla-extract/css';

const prevButton = style({
	width: 'var(--cell-size)',
	height: 'var(--cell-size)',
	backgroundColor: 'transparent',
	padding: 0,
	userSelect: 'none',
	selectors: {
		'&[disabled]': {
			opacity: 0.5,
		},
		'[dir=rtl] &': {
			transform: 'rotate(180deg)',
		},
	},
});

export default {
	prevButton,
};
