import { style, theme } from '~/styles/index.js';

const label = style({
	color: theme.colors.text.secondary,
	paddingLeft: theme.spacing[2],
	paddingRight: theme.spacing[2],
	paddingTop: '0.375rem',
	paddingBottom: '0.375rem',
	fontSize: theme.fontSize.xs,
});

export default {
	label,
};
