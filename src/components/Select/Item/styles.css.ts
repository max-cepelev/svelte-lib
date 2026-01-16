import { globalStyle, style } from '@vanilla-extract/css';
import { theme } from '../../../theme.css.js';

const item = style({
	position: 'relative',
	display: 'flex',
	width: '100%',
	cursor: 'default',
	alignItems: 'center',
	gap: theme.spacing[2],
	borderRadius: theme.borderRadius.sm,
	paddingTop: '0.375rem',
	paddingBottom: '0.375rem',
	paddingLeft: theme.spacing[2],
	paddingRight: theme.spacing[8],
	fontSize: theme.fontSize.sm,
	outline: '2px solid transparent',
	outlineOffset: '2px',
	userSelect: 'none',
	selectors: {
		'&[data-highlighted]': {
			backgroundColor: theme.colors.background.elementHover,
			color: theme.colors.text.primary,
		},
		'&[data-disabled]': {
			pointerEvents: 'none',
			opacity: 0.5,
		},
	},
});

globalStyle(`${item} svg`, {
	pointerEvents: 'none',
	flexShrink: 0,
	width: theme.spacing[4],
	height: theme.spacing[4],
});

globalStyle(`${item} > span:last-child`, {
	display: 'flex',
	alignItems: 'center',
	gap: theme.spacing[2],
});

const checkSpan = style({
	position: 'absolute',
	insetInlineEnd: theme.spacing[2],
	display: 'flex',
	width: '0.875rem',
	height: '0.875rem',
	alignItems: 'center',
	justifyContent: 'center',
});

export default {
	item,
	checkSpan,
};
