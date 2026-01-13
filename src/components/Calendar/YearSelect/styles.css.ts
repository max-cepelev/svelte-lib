import { globalStyle, style, theme } from '~/styles/index.js';

const wrapper = style({
	position: 'relative',
	display: 'flex',
	borderRadius: theme.borderRadius.md,
	border: `1px solid ${theme.colors.border}`,
	boxShadow: theme.shadow[1],
	selectors: {
		'&:has(:focus-visible)': {
			boxShadow: theme.shadow[3],
		},
	},
});

const select = style({
	position: 'absolute',
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
	opacity: 0,
});

const visiblePart = style({
	display: 'flex',
	height: theme.spacing[8],
	alignItems: 'center',
	gap: theme.spacing[1],
	borderRadius: theme.borderRadius.md,
	paddingLeft: theme.spacing[2],
	paddingRight: theme.spacing[1],
	fontSize: theme.fontSize.sm,
	fontWeight: theme.fontWeight.medium,
	userSelect: 'none',
});

globalStyle(`${visiblePart} > svg`, {
	color: theme.colors.text.secondary,
	width: '0.875rem',
	height: '0.875rem',
});

export default {
	wrapper,
	select,
	visiblePart,
};
