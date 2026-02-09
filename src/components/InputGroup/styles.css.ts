import { globalStyle, style } from '@vanilla-extract/css';
import { theme } from '~/theme';

export const container = style({
	position: 'relative',
	display: 'flex',
	width: '100%',
	alignItems: 'stretch',
	borderRadius: theme.borderRadius.md,
	border: `1px solid ${theme.colors.border}`,
	backgroundColor: theme.colors.background.paper,
	boxShadow: theme.shadow[1],
	minHeight: theme.spacing[9],
	padding: 0,
	overflow: 'hidden',
	transition: 'border-color 0.2s, box-shadow 0.2s, color 0.2s',
	selectors: {
		'&:has(> textarea)': {
			minHeight: 'auto',
		},
		'&:has(> [data-align="block-start"])': {
			flexDirection: 'column',
			alignItems: 'stretch',
			minHeight: 'auto',
			gap: theme.spacing[2],
		},
		'&:has(> [data-align="block-end"])': {
			flexDirection: 'column',
			alignItems: 'stretch',
			minHeight: 'auto',
			gap: theme.spacing[2],
		},
		'&:has([data-slot="input-group-control"]:focus-visible)': {
			borderColor: theme.colors.primary,
			boxShadow: theme.shadow[2],
		},
		'&:has([data-slot][aria-invalid="true"])': {
			borderColor: theme.colors.error,
			boxShadow: `0 0 0 3px color-mix(in oklch, ${theme.colors.error} 40%, transparent)`,
		},
		'&[data-disabled="true"]': {
			opacity: 0.55,
			cursor: 'not-allowed',
		},
	},
});

globalStyle(`${container} > *`, {
	display: 'flex',
	alignItems: 'center',
	gap: theme.spacing[2],
});

globalStyle(`${container} > [data-slot="input-group-control"]`, {
	flex: 1,
	minWidth: 0,
	alignSelf: 'stretch',
});

globalStyle(
	`${container}:has(> [data-align="inline-start"]) > [data-slot="input-group-control"]`,
	{
		paddingLeft: theme.spacing[2],
	},
);

globalStyle(
	`${container}:has(> [data-align="inline-end"]) > [data-slot="input-group-control"]`,
	{
		paddingRight: theme.spacing[2],
	},
);

globalStyle(
	`${container}:has(> [data-align="block-start"]) > [data-slot="input-group-control"]`,
	{
		paddingBottom: theme.spacing[3],
	},
);

globalStyle(
	`${container}:has(> [data-align="block-end"]) > [data-slot="input-group-control"]`,
	{
		paddingTop: theme.spacing[3],
	},
);

export default {
	container,
};
