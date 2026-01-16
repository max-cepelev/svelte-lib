import { style } from '@vanilla-extract/css';
import { theme } from '../../../theme.css.js';

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
