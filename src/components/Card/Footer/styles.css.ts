import { globalStyle, style, theme } from '~/styles/index.js';

const footer = style({
	display: 'flex',
	alignItems: 'center',
	paddingLeft: theme.spacing[6],
	paddingRight: theme.spacing[6],
});

globalStyle(`${footer}[data-slot=card-footer-border]`, {
	paddingTop: theme.spacing[6],
});

export default {
	footer,
};
