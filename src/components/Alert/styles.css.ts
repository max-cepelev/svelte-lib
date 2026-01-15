import {
	type ComplexStyleRule,
	globalStyle,
	style,
	styleVariants,
} from '~/styles/index.js';
import { theme } from '~/styles/theme.css.js';
import type { AlertVariant } from './types.js';

const alertBase = style({
	position: 'relative',
	display: 'grid',
	gridTemplateColumns: '0 1fr',
	alignItems: 'start',
	gap: `${theme.spacing[1]} 0`,
	borderRadius: theme.borderRadius.lg,
	border: `1px solid ${theme.colors.border}`,
	padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
	fontSize: theme.fontSize.sm,
	selectors: {
		'&[data-has-svg=true]': {
			gridTemplateColumns: `calc(${theme.spacing[4]}) 1fr`,
			gap: `0 ${theme.spacing[3]}`,
		},
	},
});

globalStyle(`${alertBase} > svg`, {
	width: '1rem',
	height: '1rem',
	transform: `translateY(${theme.spacing[1]})`,
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
		},
	],
	error: [
		alertBase,
		{
			color: theme.colors.error,
			backgroundColor: theme.colors.background.paper,
		},
	],
	info: [
		alertBase,
		{
			color: theme.colors.info,
			backgroundColor: theme.colors.background.paper,
		},
	],
	success: [
		alertBase,
		{
			color: theme.colors.success,
			backgroundColor: theme.colors.background.paper,
		},
	],
	warning: [
		alertBase,
		{
			color: theme.colors.warning,
			backgroundColor: theme.colors.background.paper,
		},
	],
});
