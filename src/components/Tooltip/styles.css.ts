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

export const content = style({
	zIndex: 50,
	backgroundColor: theme.colors.background.tooltip,
	color: theme.colors.background.paper,
	borderRadius: theme.radius.small,
	padding: theme.spacing[2],
	fontSize: theme.fontSize.xs,
	fontWeight: theme.fontWeight.semibold,
	textAlign: 'center',
	width: 'fit-content',
	maxWidth: 'min(320px, calc(100vw - 32px))',
	animation: `${fadeIn} 150ms ease-out, ${zoomIn} 150ms ease-out`,
	whiteSpace: 'normal',
	overflowWrap: 'break-word',
	// textWrap: 'balance',
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
	},
});

export const arrow = style({
	fill: theme.colors.background.tooltip,
	width: 14,
	height: 8,
	position: 'absolute',
	pointerEvents: 'none',
	selectors: {
		'&[data-side="top"]': {
			bottom: 1,
			left: '50%',
			transform: 'translateX(-50%) translateY(100%)',
		},
		'&[data-side="bottom"]': {
			top: 1,
			left: '50%',
			transform: 'translateX(-50%) translateY(-100%) rotate(180deg)',
		},
		'&[data-side="left"]': {
			right: 4,
			top: '50%',
			transform: 'translateY(-50%) translateX(100%) rotate(-90deg)',
		},
		'&[data-side="right"]': {
			left: 4,
			top: '50%',
			transform: 'translateY(-50%) translateX(-100%) rotate(90deg)',
		},
	},
});
