import type { ComplexStyleRule } from '@vanilla-extract/css';
import {
	globalStyle,
	keyframes,
	style,
	styleVariants,
} from '@vanilla-extract/css';
import { theme } from '~/theme';
import type { ButtonSize, ButtonVariant } from './types';

const buttonBase = style({
	display: 'inline-flex',
	justifyContent: 'center',
	alignItems: 'center',
	whiteSpace: 'nowrap',
	borderRadius: theme.radius.medium,
	borderWidth: 0,
	fontSize: 'inherit',
	fontFamily: 'inherit',
	fontWeight: theme.fontWeight.medium,
	transition: 'background-color 0.2s',
	cursor: 'pointer',
	lineHeight: '100%',
	position: 'relative',
	selectors: {
		'&:disabled': {
			pointerEvents: 'none',
			opacity: 0.6,
		},
		'&:focus-visible': {
			outline: '2px solid transparent',
			outlineOffset: '2px',
			boxShadow: theme.elevation[1],
		},
	},
});

const spin = keyframes({
	'0%': {
		transform: 'rotate(0deg)',
	},
	'100%': {
		transform: 'rotate(360deg)',
	},
});

const loading = style({
	pointerEvents: 'none',
	opacity: 0.6,
	'::after': {
		content: '',
		position: 'absolute',
		display: 'inline-block',
		boxSizing: 'border-box',
		width: '18px',
		height: '18px',
		borderRadius: '50%',
		borderWidth: '2px',
		borderStyle: 'solid',
		borderBottomColor: 'transparent',
		animation: `${spin} 1s linear infinite`,
		zIndex: 2,
	},
	':before': {
		content: '',
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		borderRadius: 'inherit',
		backgroundColor: 'inherit',
		zIndex: 1,
	},
});

const fullWidth = style({
	width: '100%',
});

export const buttonVariants = styleVariants<
	Record<ButtonVariant, ComplexStyleRule>
>({
	default: [
		buttonBase,
		{
			backgroundColor: theme.colors.primary,
			color: theme.colors.foreground.primary,
			':hover': {
				backgroundColor: `color-mix(in oklch, ${theme.colors.primary} 85%, transparent)`,
			},
		},
	],
	destructive: [
		buttonBase,
		{
			backgroundColor: theme.colors.error,
			color: theme.colors.foreground.primary,
			':hover': {
				backgroundColor: `color-mix(in oklch, ${theme.colors.error} 85%, transparent)`,
			},
		},
	],
	outline: [
		buttonBase,
		{
			border: `1px solid ${theme.colors.border}`,
			backgroundColor: theme.colors.background.paper,
			color: theme.colors.text.primary,
			':hover': {
				backgroundColor: theme.colors.background.elementHover,
			},
		},
	],
	ghost: [
		buttonBase,
		{
			backgroundColor: 'transparent',
			color: theme.colors.text.primary,
			selectors: {
				[`&${loading}`]: {
					backgroundColor: theme.colors.background.elementHover,
				},
			},
			':hover': {
				backgroundColor: theme.colors.background.elementHover,
			},
		},
	],
	link: [
		buttonBase,
		{
			backgroundColor: 'transparent',
			color: theme.colors.primary,
			textUnderlineOffset: '4px',
			':hover': {
				textDecorationLine: 'underline',
			},
		},
	],
});

const buttonSizes = styleVariants<Record<ButtonSize, ComplexStyleRule>>({
	small: {
		height: theme.spacing[7],
		padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
		borderRadius: theme.radius.small,
		fontSize: theme.fontSize.xs,
	},
	medium: {
		height: theme.spacing[9],
		padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
		fontSize: theme.fontSize.base,
	},
	large: {
		height: theme.spacing[10],
		padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
		fontSize: theme.fontSize.lg,
	},
	icon: {
		height: theme.spacing[9],
		width: theme.spacing[9],
	},
	iconSmall: {
		height: theme.spacing[7],
		width: theme.spacing[7],
	},
});

globalStyle(`${buttonSizes.icon} svg`, {
	width: theme.spacing[6],
	height: theme.spacing[6],
});

globalStyle(`${buttonSizes.iconSmall} svg`, {
	width: theme.spacing[4],
	height: theme.spacing[4],
});

export default {
	buttonSizes,
	buttonVariants,
	fullWidth,
	loading,
};
