import { keyframes, style } from '@vanilla-extract/css';
import { theme } from '~/theme';
import { spacing } from '~/utils';

const fadeIn = keyframes({
	'0%': { opacity: 0 },
	'100%': { opacity: 1 },
});

const fadeOut = keyframes({
	'0%': { opacity: 1 },
	'100%': { opacity: 0 },
});

const zoomIn = keyframes({
	'0%': { transform: 'scale(0.95)', opacity: 0 },
	'100%': { transform: 'scale(1)', opacity: 1 },
});

const zoomOut = keyframes({
	'0%': { transform: 'scale(1)', opacity: 1 },
	'100%': { transform: 'scale(0.95)', opacity: 0 },
});

const slideInFromTop = keyframes({
	'0%': { transform: 'translateY(8px)', opacity: 0 },
	'100%': { transform: 'translateY(0)', opacity: 1 },
});

const slideInFromBottom = keyframes({
	'0%': { transform: 'translateY(-8px)', opacity: 0 },
	'100%': { transform: 'translateY(0)', opacity: 1 },
});

const slideInFromEnd = keyframes({
	'0%': { transform: 'translateX(-8px)', opacity: 0 },
	'100%': { transform: 'translateX(0)', opacity: 1 },
});

const slideInFromStart = keyframes({
	'0%': { transform: 'translateX(8px)', opacity: 0 },
	'100%': { transform: 'translateX(0)', opacity: 1 },
});

const content = style({
	zIndex: 50,
	backgroundColor: theme.colors.background.tooltip,
	color: theme.colors.background.paper,
	borderRadius: theme.borderRadius.sm,
	padding: spacing(2, 3),
	fontSize: theme.fontSize.xs,
	fontWeight: theme.fontWeight.semibold,
	textAlign: 'center',
	width: 'fit-content',
	transformOrigin: 'var(--bits-tooltip-content-transform-origin)',
	animation: `${fadeIn} 150ms ease-out, ${zoomIn} 150ms ease-out`,
	textWrap: 'balance',
	lineHeight: theme.lineHeight.none,
	selectors: {
		'&[data-state="closed"]': {
			animation: `${fadeOut} 150ms ease-out, ${zoomOut} 150ms ease-out`,
		},
		'&[data-side="bottom"]': {
			animation: `${fadeIn} 150ms ease-out, ${slideInFromTop} 150ms ease-out`,
		},
		'&[data-side="left"]': {
			animation: `${fadeIn} 150ms ease-out, ${slideInFromEnd} 150ms ease-out`,
		},
		'&[data-side="right"]': {
			animation: `${fadeIn} 150ms ease-out, ${slideInFromStart} 150ms ease-out`,
		},
		'&[data-side="top"]': {
			animation: `${fadeIn} 150ms ease-out, ${slideInFromBottom} 150ms ease-out`,
		},
		'&[data-side="bottom"][data-state="closed"]': {
			animation: `${fadeOut} 150ms ease-out, ${zoomOut} 150ms ease-out, ${slideInFromTop} 150ms ease-out reverse`,
		},
		'&[data-side="left"][data-state="closed"]': {
			animation: `${fadeOut} 150ms ease-out, ${zoomOut} 150ms ease-out, ${slideInFromEnd} 150ms ease-out reverse`,
		},
		'&[data-side="right"][data-state="closed"]': {
			animation: `${fadeOut} 150ms ease-out, ${zoomOut} 150ms ease-out, ${slideInFromStart} 150ms ease-out reverse`,
		},
		'&[data-side="top"][data-state="closed"]': {
			animation: `${fadeOut} 150ms ease-out, ${zoomOut} 150ms ease-out, ${slideInFromBottom} 150ms ease-out reverse`,
		},
	},
});

const arrow = style({
	fill: theme.colors.background.tooltip,
	width: theme.spacing[4],
	height: theme.spacing[4],
	selectors: {
		'&[data-side="top"]': {
			translate: '0 -5px',
		},
		'&[data-side="bottom"]': {
			translate: '0 5px',
		},
		'&[data-side="right"]': {
			translate: '5px 0',
		},
		'&[data-side="left"]': {
			translate: '-5px 0',
		},
	},
});

export default {
	content,
	arrow,
};
