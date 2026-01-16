import { globalStyle, style } from '@vanilla-extract/css';
import { theme } from '../../theme.css.js';

const labelBase = style({
	display: 'flex',
	alignItems: 'center',
	gap: theme.spacing[2],
	fontSize: theme.fontSize.sm,
	lineHeight: 'none',
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

// Apply styles when Label follows a disabled peer element
globalStyle('.peer:disabled + *', {
	cursor: 'not-allowed',
	opacity: '0.5',
});

export default {
	labelBase,
};
