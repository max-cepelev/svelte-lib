import { globalStyle, style, styleVariants } from '@vanilla-extract/css';
import { theme } from '~/theme';
import type { FieldVariants } from './types';

const base = style({
	display: 'flex',
	width: '100%',
	gap: theme.spacing[3],
	selectors: {
		'&[data-invalid=true]': {
			color: theme.colors.error,
		},
	},
});

const vertical = style({
	flexDirection: 'column',
});

globalStyle(`${vertical} > *`, {
	width: '100%',
});

const horizontal = style({
	flexDirection: 'row',
	alignItems: 'center',
});

globalStyle(`${horizontal} > [data-slot=field-label]`, {
	flex: '1 1 0%',
});

globalStyle(`${horizontal}:has(>[data-slot=field-content])`, {
	alignItems: 'flex-start',
});

globalStyle(
	`${horizontal}:has(>[data-slot=field-content]) > [role=checkbox], ${horizontal}:has(>[data-slot=field-content]) > [role=radio]`,
	{
		marginTop: '1px',
	},
);

const responsive = style({
	flexDirection: 'column',
	'@media': {
		'(min-width: 768px)': {
			flexDirection: 'row',
			alignItems: 'center',
		},
	},
});

globalStyle(`${responsive} > *`, {
	width: '100%',
	'@media': {
		'(min-width: 768px)': {
			width: 'auto',
		},
	},
});

globalStyle(`${responsive} > [data-slot=field-label]`, {
	width: '100%',
	'@media': {
		'(min-width: 768px)': {
			flex: '1 1 0%',
		},
	},
});

globalStyle(`${responsive}:has(>[data-slot=field-content])`, {
	width: '100%',
	'@media': {
		'(min-width: 768px)': {
			alignItems: 'flex-start',
		},
	},
});

globalStyle(
	`${responsive}:has(>[data-slot=field-content]) > [role=checkbox], ${responsive}:has(>[data-slot=field-content]) > [role=radio]`,
	{
		width: '100%',
		'@media': {
			'(min-width: 768px)': {
				marginTop: '1px',
			},
		},
	},
);

export const fieldVariants = styleVariants<FieldVariants>({
	vertical: [base, vertical],
	horizontal: [base, horizontal],
	responsive: [base, responsive],
});

export default {
	fieldVariants,
};
