/* ===== Animations ===== */

import { keyframes, style, theme } from '~/styles/index.js';

const fadeIn = keyframes({
	from: { opacity: 0 },
	to: { opacity: 1 },
});

const fadeOut = keyframes({
	from: { opacity: 1 },
	to: { opacity: 0 },
});

const zoomIn95 = keyframes({
	from: { transform: 'scale(0.95)' },
	to: { transform: 'scale(1)' },
});

const zoomOut95 = keyframes({
	from: { transform: 'scale(1)' },
	to: { transform: 'scale(0.95)' },
});

const slideFromTop = keyframes({
	from: { transform: 'translateY(-0.5rem)' },
	to: { transform: 'translateY(0)' },
});

const slideFromBottom = keyframes({
	from: { transform: 'translateY(0.5rem)' },
	to: { transform: 'translateY(0)' },
});

const slideFromStart = keyframes({
	from: { transform: 'translateX(-0.5rem)' },
	to: { transform: 'translateX(0)' },
});

const slideFromEnd = keyframes({
	from: { transform: 'translateX(0.5rem)' },
	to: { transform: 'translateX(0)' },
});

const content = style({
	zIndex: 50,
	backgroundColor: theme.colors.background.paper,
	color: theme.colors.text.primary,

	maxHeight: 'var(--bits-dropdown-menu-content-available-height)',
	minWidth: '8rem',

	transformOrigin: 'var(--bits-dropdown-menu-content-transform-origin)',

	overflowX: 'hidden',
	overflowY: 'auto',

	borderRadius: theme.borderRadius.md,
	border: `1px solid ${theme.colors.border}`,
	padding: theme.spacing[1],
	boxShadow: theme.shadow[4],

	outline: 'none',

	selectors: {
		/* state: open / close */
		'&[data-state=open]': {
			animation: `${fadeIn} 150ms ease-out, ${zoomIn95} 150ms ease-out`,
		},

		'&[data-state=closed]': {
			animation: `${fadeOut} 150ms ease-in, ${zoomOut95} 150ms ease-in`,
		},

		/* side-based slide */
		'&[data-side=bottom]': {
			animation: `${slideFromTop} 150ms ease-out`,
		},

		'&[data-side=top]': {
			animation: `${slideFromBottom} 150ms ease-out`,
		},

		'&[data-side=left]': {
			animation: `${slideFromEnd} 150ms ease-out`,
		},

		'&[data-side=right]': {
			animation: `${slideFromStart} 150ms ease-out`,
		},
	},
});

export default { content };
