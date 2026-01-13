import { style, theme } from '~/styles/index.js';

const gridRow = style({
	display: 'flex',
	columnGap: theme.spacing[1],
});

export default {
	gridRow,
};
