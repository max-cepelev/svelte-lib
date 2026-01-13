import { globalStyle, style, theme } from '~/styles/index.js';

const labelBase = style({
	display: 'flex',
	alignItems: 'center',
	gap: theme.spacing[2], // gap-2
	fontSize: theme.fontSize.sm, // text-sm
	lineHeight: 'none', // leading-none
	fontWeight: theme.fontWeight.medium, // font-medium
	userSelect: 'none', // select-none
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
