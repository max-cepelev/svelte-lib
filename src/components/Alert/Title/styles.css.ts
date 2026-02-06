import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

const title = style({
	gridArea: 'title',
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
