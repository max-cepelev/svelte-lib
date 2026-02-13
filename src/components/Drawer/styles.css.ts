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

const slideIn = keyframes({
	from: { transform: 'translateY(100%)' },
	to: { transform: 'translateY(0)' },
});

const overlay = style({
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

const content = style({
	position: 'fixed',
	display: 'flex',
	flexDirection: 'column',
	backgroundColor: theme.colors.background.paper,
	color: theme.colors.text.primary,
	border: `1px solid ${theme.colors.border}`,
	boxShadow: theme.shadow[4],
	zIndex: 51,
	width: '100%',
	maxWidth: '100%',
	maxHeight: '100%',
	inset: 'auto 0 0 0',
	borderRadius: `${theme.borderRadius.lg} ${theme.borderRadius.lg} 0 0`,
	selectors: {
		'&[data-state=open]': {
			animation: `${slideIn} 220ms ease-out`,
		},
		'&[data-state=closed]': {
			transform: 'translateY(100%)',
			// animation: `${slideOut} 200ms ease-in`,
		},
	},
});

const contentTransition = style({
	transition: 'transform 210ms ease-in-out',
});

const header = style({
	display: 'flex',
	flexDirection: 'column',
	gap: theme.spacing[2],
	padding: theme.spacing[4],
});

const footer = style({
	marginTop: 'auto',
	display: 'flex',
	flexDirection: 'column',
	gap: theme.spacing[2],
	padding: theme.spacing[4],
});

const title = style({
	fontSize: theme.fontSize.lg,
	fontWeight: theme.fontWeight.semibold,
	color: theme.colors.text.primary,
});

const description = style({
	fontSize: theme.fontSize.sm,
	color: theme.colors.text.secondary,
});

const closeButton = style({
	position: 'absolute',
	top: theme.spacing[4],
	right: theme.spacing[4],
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	border: 'none',
	backgroundColor: 'transparent',
	color: theme.colors.text.secondary,
	padding: theme.spacing[1],
	borderRadius: theme.borderRadius.sm,
	cursor: 'pointer',
	opacity: 0.7,
	transition: 'opacity 0.2s ease',
	selectors: {
		'&:hover': {
			opacity: 1,
		},
		'&:focus-visible': {
			outline: `2px solid ${theme.colors.primary}`,
			outlineOffset: '2px',
		},
	},
});

const handle = style({
	width: '100%',
	height: theme.spacing[8],
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	'::after': {
		content: '',
		width: 100,
		height: 8,
		borderRadius: theme.borderRadius.md,
		backgroundColor: theme.colors.background.element,
	},
});

const visuallyHidden = style({
	position: 'absolute',
	width: '1px',
	height: '1px',
	padding: 0,
	margin: '-1px',
	overflow: 'hidden',
	clip: 'rect(0, 0, 0, 0)',
	whiteSpace: 'nowrap',
	border: 0,
});

export default {
	overlay,
	visuallyHidden,
	handle,
	closeButton,
	title,
	description,
	header,
	footer,
	content,
	contentTransition,
};
