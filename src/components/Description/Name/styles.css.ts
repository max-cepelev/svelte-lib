import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const wrapper = style({
	flexShrink: 0,
	alignSelf: 'flex-start',
	marginRight: theme.spacing[2],
	maxWidth: 'calc(100% - 12px)',
});

export const leader = style({
	maxWidth: 'calc(100% - 36px)',
});

export const dashedSeparator = style({
	flex: 1,
	alignSelf: 'flex-end',
	minWidth: '12px',
	height: '4px',
	marginBottom: theme.spacing[1],
	marginRight: theme.spacing[2],
	borderBottom: `1px dashed ${theme.colors.border}`,
	'@media': {
		'(max-width: 600px)': {
			display: 'none',
		},
	},
});
