import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

const headCell = style({
	color: theme.colors.text.secondary,
	width: 'var(--cell-size)',
	borderRadius: theme.borderRadius.md,
	fontSize: theme.fontSize.xs,
	fontWeight: theme.fontWeight.normal,
});

export default {
	headCell,
};
