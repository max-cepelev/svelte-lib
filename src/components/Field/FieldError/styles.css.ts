import { globalStyle, style, theme } from '~/styles/index.js';

const root = style({
	color: theme.colors.error,
	fontSize: theme.fontSize.sm,
	fontWeight: theme.fontWeight.normal,
});

globalStyle(`${root} ul`, {
	marginInlineStart: theme.spacing[4],
	display: 'flex',
	flexDirection: 'column',
	gap: theme.spacing[1],
	listStyleType: 'disc',
});

globalStyle(`${root} ul li`, {
	textAlign: 'start',
});

export default {
	root,
};
