import { style, theme } from '~/styles/index.js';

const heading = style({
	paddingLeft: 'var(--cell-size)',
	paddingRight: 'var(--cell-size)',
	fontSize: theme.fontSize.sm,
	fontWeight: theme.fontWeight.medium,
});

export default {
	heading,
};
