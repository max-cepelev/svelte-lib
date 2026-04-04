import { globalStyle, style } from '@vanilla-extract/css';
import { theme } from '~/theme';

const labelBase = style({
	display: 'flex',
	alignItems: 'center',
	gap: theme.spacing[1],
	fontSize: theme.fontSize.sm,
	lineHeight: 'normal',
	fontWeight: theme.fontWeight.medium,
	userSelect: 'none',
	selectors: {
		'&[data-disabled="true"]': {
			pointerEvents: 'none',
			opacity: '0.5',
		},
		'&:has([data-disabled="true"])': {
			pointerEvents: 'none',
			opacity: '0.5',
		},
	},
});

const required = style({
	':after': {
		content: '*',
		marginTop: theme.spacing[1],
		color: theme.colors.error,
	},
});

// Apply styles when Label follows a disabled peer element
globalStyle('.peer:disabled + *', {
	cursor: 'not-allowed',
	opacity: '0.5',
});

export default {
	labelBase,
	required,
};
