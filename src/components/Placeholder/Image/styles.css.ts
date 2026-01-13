import {
    type ComplexStyleRule,
    style,
    styleVariants,
    theme,
} from '~/styles/index.js';
import type { PlaceholderSize } from '../types.js';

const wrapper = style({
	display: 'block',
	maxWidth: '100%',
	objectFit: 'contain',
	color: theme.colors.text.secondary,
	'@media': {
		'(max-width: 600px)': {
			margin: `auto auto ${theme.spacing[4]}`,
		},
	},
});

const sizes = styleVariants<Record<PlaceholderSize, ComplexStyleRule>>({
	small: {
		margin: `auto auto ${theme.spacing[4]}`,
	},
	medium: {
		margin: `auto auto ${theme.spacing[8]}`,
	},
	large: {
		margin: `auto auto ${theme.spacing[10]}`,
	},
});

export default {
	wrapper,
	sizes,
};
