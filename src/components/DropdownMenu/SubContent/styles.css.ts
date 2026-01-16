import { keyframes, style } from '@vanilla-extract/css';
import { theme } from '../../../theme.css.js';

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

const slideInFromTop2 = keyframes({
	'0%': { transform: 'translateY(-0.5rem)' },
	'100%': { transform: 'translateY(0)' },
});

const slideInFromBottom2 = keyframes({
	'0%': { transform: 'translateY(0.5rem)' },
	'100%': { transform: 'translateY(0)' },
});

const slideInFromLeft2 = keyframes({
	'0%': { transform: 'translateX(0.5rem)' },
	'100%': { transform: 'translateX(0)' },
});

const slideInFromRight2 = keyframes({
	'0%': { transform: 'translateX(-0.5rem)' },
	'100%': { transform: 'translateX(0)' },
});

const subContent = style({
	backgroundColor: theme.colors.background.paper,
	color: theme.colors.text.primary,
	zIndex: 50,
	minWidth: '8rem',
	overflow: 'hidden',
	borderRadius: theme.borderRadius.md,
	border: `1px solid ${theme.colors.border}`,
	padding: theme.spacing[1],
	boxShadow: theme.shadow[3],
	selectors: {
		'&[data-state=open]': {
			animation: `${fadeIn} 0.2s ease-out, ${zoomIn95} 0.2s ease-out`,
		},
		'&[data-state=closed]': {
			animation: `${fadeOut} 0.2s ease-in, ${zoomOut95} 0.2s ease-in`,
		},
		'&[data-side=bottom]': {
			animation: `${slideInFromTop2} 0.2s ease-out`,
		},
		'&[data-side=left]': {
			animation: `${slideInFromRight2} 0.2s ease-out`,
		},
		'&[data-side=right]': {
			animation: `${slideInFromLeft2} 0.2s ease-out`,
		},
		'&[data-side=top]': {
			animation: `${slideInFromBottom2} 0.2s ease-out`,
		},
	},
});

export default {
	subContent,
};
