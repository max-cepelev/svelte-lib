import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const control = style({
	flex: 1,
	width: '100%',
	border: 'none',
	backgroundColor: 'transparent',
	color: theme.colors.text.primary,
	fontSize: theme.fontSize.base,
	lineHeight: theme.lineHeight.normal,
	paddingInline: theme.spacing[3],
	paddingBlock: theme.spacing[2],
	minHeight: theme.spacing[9],
	minWidth: 0,
	boxShadow: 'none',
	borderRadius: 0,
	appearance: 'none',
	selectors: {
		'&:focus-visible': {
			outline: 'none',
			boxShadow: 'none',
		},
		'&::placeholder': {
			color: theme.colors.text.hint,
		},
		'&:disabled': {
			opacity: 0.5,
			cursor: 'not-allowed',
		},
	},
});

export default {
	control,
};
