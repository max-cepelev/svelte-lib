import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

const nav = style({
	position: 'absolute',
	left: 0,
	right: 0,
	top: 0,
	display: 'flex',
	width: '100%',
	alignItems: 'center',
	justifyContent: 'space-between',
	gap: theme.spacing[1],
});

export default {
	nav,
};
