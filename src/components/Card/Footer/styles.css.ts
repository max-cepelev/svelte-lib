import { globalStyle, style } from '@vanilla-extract/css';
import { theme } from '~/theme';

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
