import { globalStyle, style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const text = style({
	display: 'inline-flex',
	alignItems: 'center',
	gap: theme.spacing[2],
	color: theme.colors.text.hint,
	fontSize: theme.fontSize.sm,
});

globalStyle(`${text} svg`, {
	pointerEvents: 'none',
});

globalStyle(`${text} svg:not([class*='size-'])`, {
	width: '1rem',
	height: '1rem',
});

export default {
	text,
};
