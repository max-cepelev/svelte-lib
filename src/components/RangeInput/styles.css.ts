import { style, styleVariants } from '@vanilla-extract/css';
import { theme } from '../../theme.css.js';
import { spacing } from '../../utils.js';

export const container = style({
	position: 'relative',
	display: 'grid',
	gridTemplateColumns: 'auto auto 1fr auto 1fr auto',
	alignItems: 'center',
	columnGap: theme.spacing[1],
	background: theme.colors.background.paper,
	border: `1px solid ${theme.colors.border}`,
	borderRadius: theme.borderRadius.md,
	transition: 'border 0.2s',

	'@media': {
		'(max-width: 600px)': {
			width: '100%',
		},
	},
});

export const activeClass = style({
	borderColor: theme.colors.primary,
});

export const sizes = styleVariants({
	small: {
		padding: `0.125rem ${theme.spacing[2]}`,
		height: '28px',
		fontSize: theme.fontSize.sm,
	},
	medium: {
		padding: spacing(1, 3),
		height: '36px',
		fontSize: theme.fontSize.base,
	},
	large: {
		padding: spacing(2, 4),
		height: '44px',
		fontSize: theme.fontSize.lg,
	},
});

export const textClass = style({
	fontSize: 'inherit',
});

export const inputClass = style({
	textAlign: 'center',
	width: '100%',
	minWidth: '24px',
	border: 'none',
	fontSize: 'inherit',
	textWrap: 'nowrap',
	textOverflow: 'ellipsis',
	overflow: 'hidden',
	outline: 'none',
	background: 'transparent',
	color: 'inherit',

	selectors: {
		'&:focus': {
			border: 'none',
		},
	},
});

export const sliderClass = style({
	position: 'absolute',
	bottom: -1,
	left: '50%',
	transform: 'translateX(-50%)',
	width: 'calc(100% - 4px)',
});

export default {
	container,
	activeClass,
	sizes,
	textClass,
	inputClass,
	sliderClass,
};
