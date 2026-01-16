import { globalStyle, style } from '@vanilla-extract/css';
import { theme } from '../../../theme.css.js';

const trigger = style({
	borderColor: theme.colors.border,
	display: 'flex',
	width: 'fit-content',
	alignItems: 'center',
	justifyContent: 'space-between',
	gap: theme.spacing[2],
	borderRadius: theme.borderRadius.md,
	border: `1px solid ${theme.colors.border}`,
	backgroundColor: 'transparent',
	paddingLeft: theme.spacing[3],
	paddingRight: theme.spacing[3],
	paddingTop: theme.spacing[2],
	paddingBottom: theme.spacing[2],
	fontSize: theme.fontSize.sm,
	whiteSpace: 'nowrap',
	boxShadow: theme.shadow[1],
	transitionProperty: 'color, box-shadow',
	outline: '2px solid transparent',
	outlineOffset: '2px',
	userSelect: 'none',
	selectors: {
		'&[data-placeholder]': {
			color: theme.colors.text.secondary,
		},
		'&:focus-visible': {
			borderColor: theme.colors.info,
			boxShadow: `0 0 0 3px ${theme.colors.info}`,
		},
		'&[aria-invalid=true]': {
			boxShadow: `0 0 0 3px rgba(${theme.colors.error}, 0.2)`,
			borderColor: theme.colors.error,
		},
		'&[disabled]': {
			cursor: 'not-allowed',
			opacity: 0.5,
		},
		'&[data-size=default]': {
			height: '2.25rem',
		},
		'&[data-size=sm]': {
			height: '2rem',
		},
	},
});

globalStyle(`${trigger} svg`, {
	pointerEvents: 'none',
	flexShrink: 0,
	width: theme.spacing[4],
	height: theme.spacing[4],
});

globalStyle(`${trigger} > [data-slot=select-value]`, {
	display: 'flex',
	alignItems: 'center',
	gap: theme.spacing[2],
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	WebkitLineClamp: 1,
	WebkitBoxOrient: 'vertical',
});

const chevronIcon = style({
	width: theme.spacing[4],
	height: theme.spacing[4],
	opacity: 0.5,
});

export default {
	trigger,
	chevronIcon,
};
