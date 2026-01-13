import { style, theme } from '~/styles/index.js';

const item = style({
	borderBottom: `1px solid ${theme.colors.border}`,
	selectors: {
		'&:last-child': {
			borderBottom: 'none',
		},
	},
});

export default {
	item,
};
