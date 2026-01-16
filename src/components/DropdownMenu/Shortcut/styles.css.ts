import { style } from '@vanilla-extract/css';
import { theme } from '../../../theme.css.js';

const shortcut = style({
	color: theme.colors.text.secondary,
	marginInlineStart: 'auto',
	fontSize: theme.fontSize.xs,
	letterSpacing: '0.1em',
});

export default {
	shortcut,
};
