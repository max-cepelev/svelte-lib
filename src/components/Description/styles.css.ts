import { style, styleVariants } from '@vanilla-extract/css';

export const wrapper = style({
	display: 'flex',
	height: 'max-content',
	margin: 0,
});

export const direction = styleVariants({
	default: {
		flexDirection: 'row',
		'@media': {
			'(max-width: 600px)': {
				flexDirection: 'column',
			},
		},
	},
	column: {
		flexDirection: 'column',
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
});

export const justify = styleVariants({
	start: {
		justifyContent: 'flex-start',
	},
	'space-between': {
		justifyContent: 'space-between',
	},
});
