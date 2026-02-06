import { keyframes, style } from '@vanilla-extract/css';
import { theme } from '~/theme';

const fadeIn = keyframes({
	'0%': { opacity: 0 },
	'100%': { opacity: 1 },
});

const fadeOut = keyframes({
	'0%': { opacity: 1 },
	'100%': { opacity: 0 },
});

const zoomIn95 = keyframes({
	'0%': { opacity: 0, transform: 'scale(0.95)' },
	'100%': { opacity: 1, transform: 'scale(1)' },
});

const zoomOut95 = keyframes({
	'0%': { opacity: 1, transform: 'scale(1)' },
	'100%': { opacity: 0, transform: 'scale(0.95)' },
});

const content = style({
	backgroundColor: theme.colors.background.paper,
	color: theme.colors.text.primary,
	position: 'relative',
	zIndex: 50,
	maxHeight: 'var(--bits-select-content-available-height)',
	minWidth: '8rem',
	overflowX: 'hidden',
	overflowY: 'auto',
	borderRadius: theme.borderRadius.md,
	border: `1px solid ${theme.colors.border}`,
	boxShadow: theme.shadow[3],
	selectors: {
		'&[data-state=open]': {
			animation: `${fadeIn} 0.2s ease-out, ${zoomIn95} 0.2s ease-out`,
		},
		'&[data-state=closed]': {
			animation: `${fadeOut} 0.2s ease-in, ${zoomOut95} 0.2s ease-in`,
		},
	},
});

const viewport = style({
	height: 'var(--bits-select-anchor-height)',
	width: '100%',
	minWidth: 'var(--bits-select-anchor-width)',
	scrollMarginTop: theme.spacing[1],
	scrollMarginBottom: theme.spacing[1],
	padding: theme.spacing[1],
});

export default {
	content,
	viewport,
};
