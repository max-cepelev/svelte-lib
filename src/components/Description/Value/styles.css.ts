import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const wrapper = style({
	display: 'grid',
	gridTemplateColumns: 'auto 1fr auto',
	alignItems: 'center',
	overflow: 'hidden',
	overflowWrap: 'break-word',
	hyphens: 'auto',
	cursor: 'default',
	margin: 0,
});

export const canCopy = style({
	cursor: 'pointer',
	':hover': {
		textDecoration: 'underline',
	},
});

export const copyIcon = style({
	color: theme.colors.text.secondary,
	cursor: 'pointer',
	':hover': {
		color: theme.colors.primary,
	},
	selectors: {
		'&[data-position="left"]': {
			marginRight: theme.spacing[1],
		},
		'&[data-position="right"]': {
			marginLeft: theme.spacing[1],
		},
	},
});

export const hidePersonalData = style({
	filter: 'blur(4px)',
	userSelect: 'none',
});
