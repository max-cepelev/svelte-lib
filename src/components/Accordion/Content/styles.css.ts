import { keyframes, style } from '@vanilla-extract/css';
import { theme } from '~/theme';

const accordionUp = keyframes({
	'0%': {
		height: 'var(--bits-accordion-content-height)',
	},
	'100%': {
		height: 0,
	},
});

const accordionDown = keyframes({
	from: {
		height: 0,
	},
	to: {
		height: 'var(--bits-accordion-content-height)',
	},
});

const content = style({
	overflow: 'hidden',
	paddingInline: theme.spacing[2],
	selectors: {
		'&[data-state=closed]': {
			animation: `${accordionUp} 0.2s ease-out`,
		},
		'&[data-state=open]': {
			animation: `${accordionDown} 0.2s ease-out`,
		},
	},
});

const inner = style({
	paddingTop: 0,
	paddingBottom: theme.spacing[4],
});

export default {
	content,
	inner,
};
