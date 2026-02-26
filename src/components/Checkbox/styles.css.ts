import { globalStyle, keyframes, style } from '@vanilla-extract/css';
import { theme } from '~/theme';

const checked = keyframes({
	'0%': {
		scale: 0,
	},
	'60%': {
		scale: 1.15,
	},
	'100%': {
		scale: 1,
	},
});

const unchecked = keyframes({
	from: {
		scale: 1,
	},
	to: {
		scale: 0,
	},
});

const checkboxBase = style({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	width: theme.spacing[4],
	height: theme.spacing[4],
	flexShrink: 0,
	borderRadius: theme.spacing[1],
	border: `1px solid ${theme.colors.border}`,
	backgroundColor: 'transparent',
	transition: 'background-color 200ms, border-color 200ms',
	cursor: 'pointer',
	outline: 'none',
	color: theme.colors.foreground.primary,
	':focus-visible': {
		outline: 'none',
		borderColor: theme.colors.primary,
	},
	':hover': {
		borderColor: theme.colors.primary,
		boxShadow: theme.shadow[2],
	},
	selectors: {
		'&:disabled': {
			cursor: 'not-allowed',
			opacity: '0.5',
		},
		'&[data-state="checked"]': {
			backgroundColor: theme.colors.primary,
			borderColor: theme.colors.primary,
		},
		'&[aria-invalid="true"]': {
			borderColor: theme.colors.error,
		},
	},
});

const indicator = style({
	color: 'currentColor',
});

globalStyle(`${checkboxBase}[data-state="checked"] ${indicator}`, {
	animation: `${checked} 400ms ease-in-out`,
});

globalStyle(`${checkboxBase}[data-state="unchecked"] ${indicator}`, {
	animation: `${unchecked} 400ms ease-in-out`,
});

export default {
	checkboxBase,
	indicator,
};
