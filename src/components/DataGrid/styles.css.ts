import { style, theme } from '~/styles/index.js';

const container = style({
	position: 'relative',
	display: 'flex',
	flexDirection: 'column',
	backgroundColor: theme.colors.background.paper,
	width: '100%',
	height: '100%',
	overflow: 'hidden auto',
	border: `1px solid ${theme.colors.border}`,
	borderRadius: theme.borderRadius.md,
});

const table = style({
	width: '100%',
	tableLayout: 'fixed',
	borderCollapse: 'separate',
	borderSpacing: 0,
});

const fullHeight = style({
	height: '100%',
});

const disabled = style({
	pointerEvents: 'none',
	background: theme.colors.background.paper,
	mixBlendMode: 'luminosity',
});

const loading = style({
	pointerEvents: 'none',
	opacity: 0.5,
});

const title = style({
	fontSize: theme.fontSize['2xl'],
	fontWeight: theme.fontWeight.semibold,
	lineHeight: theme.lineHeight.none,
	letterSpacing: '-0.025em',
});

export default {
	container,
	table,
	fullHeight,
	disabled,
	loading,
	title,
};
