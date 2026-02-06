import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

const footer = style({
	width: '100%',
	height: 'auto',
	display: 'flex',
	justifyContent: 'flex-end',
	alignItems: 'center',
	backgroundColor: theme.colors.background.paper,
	position: 'sticky',
	bottom: 0,
	padding: theme.spacing[2],
	borderTop: `1px solid ${theme.colors.border}`,
	marginTop: 'auto',
	selectors: {
		'&:empty': {
			display: 'none',
		},
	},
});

export default {
	footer,
};
