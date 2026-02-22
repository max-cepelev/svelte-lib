import {
	type ComplexStyleRule,
	style,
	styleVariants,
} from '@vanilla-extract/css';
import { theme } from '~/theme';
import { spacing } from '~/utils';
import type { RangeInputSize } from './types';

const container = style({
	position: 'relative',
	display: 'grid',
	gridTemplateColumns: 'auto 1fr auto 1fr auto',
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

const fullWidth = style({
	width: '100%',
});

const active = style({
	borderColor: theme.colors.primary,
});

const sizes = styleVariants<Record<RangeInputSize, ComplexStyleRule>>({
	small: {
		padding: `0.125rem ${theme.spacing[2]} ${theme.spacing[1]} ${theme.spacing[2]}`,
		height: '28px',
		fontSize: theme.fontSize.sm,
	},
	medium: {
		padding: spacing(1, 3, 2, 3),
		height: '36px',
		fontSize: theme.fontSize.base,
	},
	large: {
		padding: spacing(2, 4, 3, 4),
		height: '44px',
		fontSize: theme.fontSize.lg,
	},
});

const text = style({
	fontSize: 'inherit',
});

const input = style({
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

const slider = style({
	position: 'absolute',
	bottom: -1,
	left: '50%',
	transform: 'translateX(-50%)',
	width: 'calc(100% - 4px)',
});

export default {
	container,
	active,
	sizes,
	text,
	input,
	slider,
	fullWidth,
};
