import { keyframes, style } from '@vanilla-extract/css';
import { theme } from '~/theme';

const zoomIn = keyframes({
	from: { opacity: 0, transform: 'scale(0.95)' },
	to: { opacity: 1, transform: 'scale(1)' },
});

const zoomOut = keyframes({
	from: { opacity: 1, transform: 'scale(1)' },
	to: { opacity: 0, transform: 'scale(0.95)' },
});

export const content = style({
	backgroundColor: theme.colors.background.paper,
	color: theme.colors.text.primary,
	zIndex: 50,
	width: '18rem', // 72 in tailwind
	borderRadius: theme.borderRadius.md,
	border: `1px solid ${theme.colors.border}`,
	padding: theme.spacing[4],
	boxShadow: theme.shadow[2],
	outline: 'none',
	transformOrigin: 'var(--bits-popover-content-transform-origin)',
	selectors: {
		'&[data-state=open]': {
			animation: `${zoomIn} 0.15s ease-out`,
		},
		'&[data-state=closed]': {
			animation: `${zoomOut} 0.1s ease-in`,
		},
	},
});

export const trigger = style({
	cursor: 'pointer',
});

export const close = style({
	cursor: 'pointer',
});

export default {
	content,
	trigger,
	close,
};
