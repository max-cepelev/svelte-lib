import { globalStyle, style, theme } from '~/styles/index.js';

const header = style({
	display: 'grid',
	gridAutoRows: 'min-content',
	gridTemplateRows: 'auto auto',
	alignItems: 'start',
	gap: theme.spacing[2],
	paddingLeft: theme.spacing[6],
	paddingRight: theme.spacing[6],
	selectors: {
		'&[data-slot=card-action]': {
			gridTemplateColumns: '1fr auto',
		},
	},
});

globalStyle(`${header} > [data-slot=card-action]`, {
	gridColumn: 2,
	gridRowStart: 1,
	gridRowEnd: 'span 2',
	justifySelf: 'end',
});

export default {
	header,
};
