import { globalStyle, style } from '~/styles/index.js';
import { theme } from '~/styles/theme.css.js';

const description = style({
	gridColumn: 2,
	display: 'grid',
	justifyItems: 'start',
	gap: theme.spacing[1],
	fontSize: theme.fontSize.sm,
	color: theme.colors.text.secondary,
});

globalStyle(`${description} p`, {
	lineHeight: theme.lineHeight.relaxed,
});

export default {
	description,
};
