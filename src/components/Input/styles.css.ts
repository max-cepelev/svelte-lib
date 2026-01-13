import {
    globalStyle,
    spacing,
    style,
    styleVariants,
    theme,
} from '~/styles/index.js';

const inputBase = style({
	backgroundColor: theme.colors.background.paper,
	border: `1px solid ${theme.colors.border}`,
	borderRadius: theme.borderRadius.md,
	color: theme.colors.text.primary,
	fontSize: theme.fontSize.base,
	fontWeight: theme.fontWeight.normal,
	lineHeight: theme.lineHeight.normal,
	minWidth: 0,
	transition: 'color 0.2s, border-color 0.2s, box-shadow 0.2s',
	outline: 'none',
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	boxShadow: theme.shadow[1],
	selectors: {
		'&::placeholder': {
			color: theme.colors.text.hint,
		},
		'&:disabled': {
			cursor: 'not-allowed',
			opacity: 0.5,
		},
		'&:focus-visible': {
			outline: '2px solid transparent',
			outlineOffset: '2px',
			boxShadow: theme.shadow[2],
			borderColor: theme.colors.primary,
		},
		'&[aria-invalid="true"]': {
			borderColor: theme.colors.error,
			boxShadow: `0 0 0 3px ${theme.colors.error}20`,
		},
		'&:hover:not(:disabled)': {
			borderColor: theme.colors.primary,
		},
		'&:selection': {
			backgroundColor: theme.colors.primary,
			color: theme.colors.foreground.primary,
		},
	},
});

const sizes = styleVariants({
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

// File input specific styles
const fileInput = style({
	backgroundColor: theme.colors.background.paper,
	border: `1px solid ${theme.colors.border}`,
	borderRadius: theme.borderRadius.md,
	color: theme.colors.text.primary,
	fontSize: theme.fontSize.base,
	fontWeight: theme.fontWeight.medium,
	width: '100%',
	minWidth: 0,
	transition: 'color 0.2s, border-color 0.2s, box-shadow 0.2s',
	outline: 'none',
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
	'::selection': {
		backgroundColor: theme.colors.primary,
		color: theme.colors.foreground.primary,
	},
	':focus-visible': {
		outline: '2px solid transparent',
		outlineOffset: '2px',
		boxShadow: `0 0 0 3px ${theme.colors.primary}20`,
		borderColor: theme.colors.primary,
	},
	':disabled': {
		cursor: 'not-allowed',
		opacity: 0.5,
	},
	'::placeholder': {
		color: theme.colors.text.hint,
	},
	selectors: {
		'&[aria-invalid="true"]': {
			borderColor: theme.colors.error,
			boxShadow: `0 0 0 3px ${theme.colors.error}20`,
		},
	},
});

globalStyle(`${fileInput}::-webkit-file-upload-button`, {
	cursor: 'pointer',
	backgroundColor: 'transparent',
	border: 'none',
});

export default {
	inputBase,
	sizes,
	fileInput,
};
