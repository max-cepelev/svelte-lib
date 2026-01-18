import { globalStyle, style } from '@vanilla-extract/css';
import { theme } from '../../../theme.css.js';
import { spacing } from '../../../utils.js';

export const text = style({
	backgroundColor: theme.colors.background.element,
	display: 'flex',
	alignItems: 'center',
	gap: theme.spacing[2],
	borderRadius: theme.borderRadius.md,
	border: `1px solid ${theme.colors.border}`,
	padding: spacing(2, 4),
	fontSize: theme.fontSize.sm,
	fontWeight: theme.fontWeight.medium,
	color: theme.colors.text.primary,
	boxShadow: theme.shadow[1],
});

globalStyle(`${text} svg`, {
	pointerEvents: 'none',
});

// Default size for svg if not specified
globalStyle(`${text} svg:not([class*='size-'])`, {
	width: theme.spacing[4],
	height: theme.spacing[4],
});

export default {
	text,
};
