import { globalStyle, keyframes, style } from '@vanilla-extract/css';
import { theme } from '~/theme';

const root = style({
	display: 'flex',
	alignItems: 'center',
	gap: theme.spacing[2],
	selectors: {
		'&:has(input:disabled)': {
			opacity: 0.5,
		},
	},
});

globalStyle(`${root} input:disabled`, {
	cursor: 'not-allowed',
});

const group = style({
	display: 'flex',
	alignItems: 'center',
});

const slot = style({
	position: 'relative',
	zIndex: 0,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: theme.spacing[9],
	height: theme.spacing[9],
	borderColor: theme.colors.border,
	borderStyle: 'solid',
	borderWidth: '1px 1px 1px 0',
	backgroundColor: theme.colors.background.paper,
	color: theme.colors.text.primary,
	fontSize: theme.fontSize.sm,
	lineHeight: theme.lineHeight.none,
	outline: 'none',
	transition: 'border-color 0.2s, box-shadow 0.2s, color 0.2s',
	selectors: {
		'&:first-child': {
			borderInlineStartWidth: '1px',
			borderStartStartRadius: theme.radius.medium,
			borderEndStartRadius: theme.radius.medium,
		},
		'&:last-child': {
			borderStartEndRadius: theme.radius.medium,
			borderEndEndRadius: theme.radius.medium,
		},
		'&[aria-invalid="true"]': {
			borderColor: theme.colors.error,
		},
	},
});

const slotActive = style({
	zIndex: 1,
	borderColor: theme.colors.primary,
	boxShadow: `0 0 0 3px color-mix(in oklch, ${theme.colors.primary} 20%, transparent)`,
	selectors: {
		'&[aria-invalid="true"]': {
			borderColor: theme.colors.error,
			boxShadow: `0 0 0 3px color-mix(in oklch, ${theme.colors.error} 20%, transparent)`,
		},
	},
});

const caretWrapper = style({
	pointerEvents: 'none',
	position: 'absolute',
	inset: 0,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
});

const caretBlink = keyframes({
	'0%, 70%, 100%': {
		opacity: 1,
	},
	'20%, 50%': {
		opacity: 0,
	},
});

const caret = style({
	width: '1px',
	height: theme.spacing[4],
	backgroundColor: theme.colors.text.primary,
	animation: `${caretBlink} 1s ease-in-out infinite`,
});

const separator = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	color: theme.colors.text.secondary,
});

globalStyle(`${separator} svg`, {
	width: theme.spacing[4],
	height: theme.spacing[4],
});

export default {
	caret,
	caretWrapper,
	group,
	root,
	separator,
	slot,
	slotActive,
};
