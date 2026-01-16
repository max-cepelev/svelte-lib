import {
	type ComplexStyleRule,
	globalStyle,
	style,
	styleVariants,
} from '@vanilla-extract/css';
import { theme } from '../../theme.css.js';
import { spacing } from '../../utils.js';
import type { AlertVariant } from './types.js';

const alertBase = style({
	position: 'relative',
	display: 'grid',
	gridTemplateColumns: 'auto 1fr',
	gridTemplateRows: 'auto auto',
	gridTemplateAreas: `
		"icon title"
		"description description"
	`,
	alignItems: 'center',
	gap: spacing(1, 2),
	borderRadius: theme.borderRadius.lg,
	border: `1px solid ${theme.colors.border}`,
	padding: spacing(3, 4),
	fontSize: theme.fontSize.sm,
});

globalStyle(`${alertBase} > svg`, {
	width: '1rem',
	height: '1rem',
	color: 'currentColor',
});

export const alertVariants = styleVariants<
	Record<AlertVariant, ComplexStyleRule>
>({
	default: [
		alertBase,
		{
			backgroundColor: theme.colors.background.paper,
			color: theme.colors.text.primary,
			borderColor: theme.colors.border,
		},
	],
	error: [
		alertBase,
		{
			color: theme.colors.error,
			backgroundColor: theme.colors.background.paper,
			borderColor: theme.colors.error,
		},
	],
	info: [
		alertBase,
		{
			color: theme.colors.info,
			backgroundColor: theme.colors.background.paper,
			borderColor: theme.colors.info,
		},
	],
	success: [
		alertBase,
		{
			color: theme.colors.success,
			backgroundColor: theme.colors.background.paper,
			borderColor: theme.colors.success,
		},
	],
	warning: [
		alertBase,
		{
			color: theme.colors.warning,
			backgroundColor: theme.colors.background.paper,
			borderColor: theme.colors.warning,
		},
	],
});
