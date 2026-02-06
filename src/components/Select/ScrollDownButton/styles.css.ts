import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

const scrollDownButton = style({
	display: 'flex',
	cursor: 'default',
	alignItems: 'center',
	justifyContent: 'center',
	paddingTop: theme.spacing[1],
	paddingBottom: theme.spacing[1],
});

export default {
	scrollDownButton,
};
