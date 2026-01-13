import { style, theme } from '~/styles/index.js';

const scrollUpButton = style({
	display: 'flex',
	cursor: 'default',
	alignItems: 'center',
	justifyContent: 'center',
	paddingTop: theme.spacing[1],
	paddingBottom: theme.spacing[1],
});

const icon = style({
	width: theme.spacing[4],
	height: theme.spacing[4],
});

export default {
	scrollUpButton,
	icon,
};
