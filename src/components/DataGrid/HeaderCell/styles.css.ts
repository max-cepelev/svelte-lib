import { style } from '@vanilla-extract/css';
import { theme } from '../../../theme.css.js';
import { spacing } from '../../../utils.js';

const cell = style({
	padding: spacing(1, 2),
	width: '100%',
	fontWeight: theme.fontWeight.semibold,
	fontSize: theme.fontSize.sm,
	overflowWrap: 'break-word',
	backgroundColor: theme.colors.background.paper,
	borderBottom: `1px solid ${theme.colors.border}`,
});

export default {
	cell,
};
