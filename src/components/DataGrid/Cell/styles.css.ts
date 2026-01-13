import { style, theme } from '~/styles/index.js';

const cell = style({
	overflow: 'hidden',
	padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
	height: '100%',
	color: theme.colors.text.primary,
	fontSize: theme.fontSize.base,
	borderBottom: `1px solid ${theme.colors.border}`,
});

const disabled = style({
	opacity: 0.5,
});

export default {
	cell,
	disabled,
};
