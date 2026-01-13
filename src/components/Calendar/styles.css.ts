import { style, theme } from '~/styles/index.js';

const calendar = style({
	width: 'max-content',
	backgroundColor: theme.colors.background.paper,
	padding: theme.spacing[3],
	vars: {
		'--cell-size': theme.spacing[8],
	},
	selectors: {
		'[data-slot=card-content] &': {
			backgroundColor: 'transparent',
		},
		'[data-slot=popover-content] &': {
			backgroundColor: 'transparent',
		},
	},
});

const gridRow = style({
	marginTop: theme.spacing[2],
	width: '100%',
});

const gridRowHead = style({
	userSelect: 'none',
});

export default {
	calendar,
	gridRow,
	gridRowHead,
};
