import { style } from '~/styles/index.js';
import { theme } from '~/styles/theme.css.js';

const title = style({
	gridColumn: 2,
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	minHeight: '1rem',
	fontWeight: theme.fontWeight.medium,
	letterSpacing: '-0.02em',
});

export default {
	title,
};
