import { style } from '@vanilla-extract/css';
import { theme } from '../../../theme.css.js';
import { spacing } from '../../../utils.js';

const cell = style({
	overflow: 'hidden',
	padding: spacing(1, 2),
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
