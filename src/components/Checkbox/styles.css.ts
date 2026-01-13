import { style, theme } from '~/styles/index.js';

const checkboxBase = style({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	width: '1rem', // size-4
	height: '1rem', // size-4
	flexShrink: 0,
	borderRadius: theme.borderRadius.sm, // rounded-[4px]
	border: `1px solid ${theme.colors.border}`,
	backgroundColor: 'transparent', // transparent background
	transition: 'box-shadow 150ms, background-color 150ms, border-color 150ms',
	cursor: 'pointer',
	outline: 'none',
	color: theme.colors.foreground.primary,
	selectors: {
		'&:disabled': {
			cursor: 'not-allowed',
			opacity: '0.5',
		},
		'&:focus-visible': {
			outline: 'none',
			boxShadow: `0 0 0 3px color-mix(in oklch, ${theme.colors.primary} 50%, transparent)`, // ring-[3px] ring-ring/50
			borderColor: theme.colors.primary,
		},
		'&[data-state="checked"]': {
			backgroundColor: theme.colors.primary,
			borderColor: theme.colors.primary,
		},
		'&[aria-invalid="true"]': {
			boxShadow: `0 0 0 1px color-mix(in oklch, ${theme.colors.error} 20%, transparent)`,
			borderColor: theme.colors.error,
		},
	},
});

const checkboxIndicator = style({
	color: 'currentColor',
	transition: 'none',
});

export default {
	checkboxBase,
	checkboxIndicator,
};
