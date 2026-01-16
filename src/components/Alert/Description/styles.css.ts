import { globalStyle, style } from '@vanilla-extract/css';
import { theme } from '../../../theme.css.js';

const description = style({
	gridArea: 'description',
	display: 'grid',
	justifyItems: 'start',
	gap: theme.spacing[1],
	fontSize: theme.fontSize.sm,
	opacity: 0.8,
});

globalStyle(`${description} p`, {
	lineHeight: theme.lineHeight.relaxed,
});

export default {
	description,
};
