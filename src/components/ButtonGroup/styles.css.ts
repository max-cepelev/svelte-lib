import {
	type ComplexStyleRule,
	globalStyle,
	style,
	styleVariants,
} from '@vanilla-extract/css';
import { theme } from '../../theme.css.js';
import type { ButtonGroupOrientation } from './types.js';

export const container = style({
	display: 'flex',
	width: 'fit-content',
	alignItems: 'stretch',
	selectors: {
		'&:has(> [data-slot=button-group])': {
			gap: theme.spacing[2],
		},
	},
});

export const orientation = styleVariants<
	Record<ButtonGroupOrientation, ComplexStyleRule>
>({
	horizontal: {
		flexDirection: 'row',
	},
	vertical: {
		flexDirection: 'column',
	},
});

// Common child styles
globalStyle(`${container} > *`, {
	position: 'relative',
});

globalStyle(`${container} > *:focus-visible`, {
	zIndex: 10,
});

// Horizontal variant child styles
globalStyle(`${orientation.horizontal} > *:not(:first-child)`, {
	borderTopLeftRadius: 0,
	borderBottomLeftRadius: 0,
	borderLeftWidth: 0,
});

globalStyle(`${orientation.horizontal} > *:not(:last-child)`, {
	borderTopRightRadius: 0,
	borderBottomRightRadius: 0,
});

// Vertical variant child styles
globalStyle(`${orientation.vertical} > *:not(:first-child)`, {
	borderTopLeftRadius: 0,
	borderTopRightRadius: 0,
	borderTopWidth: 0,
});

globalStyle(`${orientation.vertical} > *:not(:last-child)`, {
	borderBottomLeftRadius: 0,
	borderBottomRightRadius: 0,
});

// Specific slot styles
globalStyle(`${container}`, {
	width: 'fit-content',
});

globalStyle(`${container} > input`, {
	flex: 1,
});

// Last child select trigger handling for horizontal
globalStyle(
	`${orientation.horizontal}:has(> select[aria-hidden=true]:last-child) > [data-slot=select-trigger]:last-of-type`,
	{
		borderTopRightRadius: theme.borderRadius.md,
		borderBottomRightRadius: theme.borderRadius.md,
	},
);

export default {
	container,
	orientation,
};
