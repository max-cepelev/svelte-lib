import {
	type ComplexStyleRule,
	style,
	styleVariants,
} from '@vanilla-extract/css';
import { theme } from '~/theme';
import type { SliderSize } from './types';

const root = style({
	position: 'relative',
	display: 'flex',
	width: '100%',
	touchAction: 'none',
	alignItems: 'center',
	userSelect: 'none',
	selectors: {
		'&[data-disabled]': {
			opacity: 0.5,
		},
		'&[data-orientation=vertical]': {
			flexDirection: 'column',
			height: '100%',
			minHeight: '176px', // 44 units * 4px roughly
			width: 'auto',
		},
	},
});

const track = style({
	backgroundColor: theme.colors.background.element,
	position: 'relative',
	flexGrow: 1,
	overflow: 'hidden',
	borderRadius: '9999px',
});

const trackSizes = styleVariants<Record<SliderSize, ComplexStyleRule>>({
	small: {
		selectors: {
			[`${root}[data-orientation=horizontal] &`]: {
				height: 2,
			},
			[`${root}[data-orientation=vertical] &`]: {
				width: 2,
			},
		},
	},
	medium: {
		selectors: {
			[`${root}[data-orientation=horizontal] &`]: {
				height: 3,
			},
			[`${root}[data-orientation=vertical] &`]: {
				width: 3,
			},
		},
	},
	large: {
		selectors: {
			[`${root}[data-orientation=horizontal] &`]: {
				height: 4,
			},
			[`${root}[data-orientation=vertical] &`]: {
				width: 4,
			},
		},
	},
});

const range = style({
	backgroundColor: theme.colors.primary,
	position: 'absolute',
	selectors: {
		[`${root}[data-orientation=horizontal] &`]: {
			height: '100%',
		},
		[`${root}[data-orientation=vertical] &`]: {
			width: '100%',
		},
	},
});

const thumb = style({
	display: 'block',
	flexShrink: 0,
	borderRadius: '9999px',
	border: `2px solid ${theme.colors.primary}`,
	backgroundColor: theme.colors.background.paper,
	boxShadow: theme.shadow[1],
	transition: 'box-shadow 0.2s, transform 0.2s',
	cursor: 'grab',
	outline: 'none',
	selectors: {
		'&:hover': {
			boxShadow: `0 0 0 4px color-mix(in oklch, ${theme.colors.primary} 15%, transparent)`,
		},
		'&:focus-visible': {
			boxShadow: `0 0 0 4px color-mix(in oklch, ${theme.colors.primary} 25%, transparent)`,
		},
		'&:disabled': {
			pointerEvents: 'none',
			opacity: 0.5,
		},
	},
});

const thumbSizes = styleVariants<Record<SliderSize, ComplexStyleRule>>({
	small: {
		width: 12,
		height: 12,
	},
	medium: {
		width: 14,
		height: 14,
	},
	large: {
		width: 16,
		height: 16,
	},
});

export default {
	root,
	track,
	range,
	thumb,
	trackSizes,
	thumbSizes,
};
