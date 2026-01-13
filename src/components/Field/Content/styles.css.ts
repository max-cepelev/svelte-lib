import { style, theme } from '~/styles/index.js';

const content = style({
	display: 'flex',
	flex: 1,
	flexDirection: 'column',
	gap: theme.spacing[2],
	lineHeight: theme.lineHeight.snug,
});

export default {
	content,
};
