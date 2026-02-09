import { keyframes, style } from '@vanilla-extract/css';
import { theme } from '~/theme';

const fadeIn = keyframes({
	from: { opacity: 0 },
	to: { opacity: 1 },
});

const fadeOut = keyframes({
	from: { opacity: 1 },
	to: { opacity: 0 },
});

const scaleIn = keyframes({
	from: {
		opacity: 0,
		transform: 'translate(-50%, -48%) scale(0.95)',
	},
	to: {
		opacity: 1,
		transform: 'translate(-50%, -50%) scale(1)',
	},
});

const scaleOut = keyframes({
	from: {
		opacity: 1,
		transform: 'translate(-50%, -50%) scale(1)',
	},
	to: {
		opacity: 0,
		transform: 'translate(-50%, -48%) scale(0.95)',
	},
});

export const overlay = style({
	position: 'fixed',
	inset: 0,
	backgroundColor: 'rgb(15 23 42 / 0.5)',
	zIndex: 50,
	selectors: {
		'&[data-state=open]': {
			animation: `${fadeIn} 150ms ease-out`,
		},
		'&[data-state=closed]': {
			animation: `${fadeOut} 150ms ease-in`,
		},
	},
});

export const content = style({
	position: 'fixed',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	zIndex: 51,
	display: 'grid',
	gap: theme.spacing[4],
	width: 'calc(100% - 2rem)',
	maxHeight: 'min(90vh, 48rem)',
	backgroundColor: theme.colors.background.paper,
	color: theme.colors.text.primary,
	borderRadius: theme.borderRadius.lg,
	border: `1px solid ${theme.colors.border}`,
	boxShadow: theme.shadow[4],
	padding: theme.spacing[6],
	outline: 'none',
	selectors: {
		'&[data-state=open]': {
			animation: `${scaleIn} 200ms ease-out`,
		},
		'&[data-state=closed]': {
			animation: `${scaleOut} 150ms ease-in`,
		},
	},
	'@media': {
		'screen and (min-width: 640px)': {
			width: '32rem',
		},
	},
});

export const header = style({
	display: 'flex',
	flexDirection: 'column',
	gap: theme.spacing[2],
	textAlign: 'center',
	'@media': {
		'screen and (min-width: 640px)': {
			textAlign: 'left',
		},
	},
});

export const footer = style({
	display: 'flex',
	flexDirection: 'column-reverse',
	gap: theme.spacing[2],
	'@media': {
		'screen and (min-width: 640px)': {
			flexDirection: 'row',
			justifyContent: 'flex-end',
		},
	},
});

export const title = style({
	fontSize: theme.fontSize.lg,
	fontWeight: theme.fontWeight.semibold,
	lineHeight: theme.lineHeight.snug,
});

export const description = style({
	color: theme.colors.text.secondary,
	fontSize: theme.fontSize.sm,
});

export const closeButton = style({
	position: 'absolute',
	top: theme.spacing[4],
	right: theme.spacing[4],
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	border: 'none',
	borderRadius: theme.borderRadius.sm,
	backgroundColor: 'transparent',
	color: theme.colors.text.secondary,
	opacity: 0.7,
	cursor: 'pointer',
	padding: theme.spacing[1],
	transition: 'opacity 0.2s ease',
	selectors: {
		'&:hover': {
			opacity: 1,
		},
		'&:focus-visible': {
			outline: `2px solid ${theme.colors.primary}`,
			outlineOffset: '2px',
		},
		'&:disabled': {
			opacity: 0.5,
			pointerEvents: 'none',
		},
	},
});

export const visuallyHidden = style({
	border: 0,
	clip: 'rect(0, 0, 0, 0)',
	height: '1px',
	margin: '-1px',
	overflow: 'hidden',
	padding: 0,
	position: 'absolute',
	width: '1px',
	whiteSpace: 'nowrap',
});
