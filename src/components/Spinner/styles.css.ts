import { keyframes, style, styleVariants } from '@vanilla-extract/css';
import { theme } from '~/theme';

const spin = keyframes({
	from: {
		transform: 'rotate(0deg)',
	},
	to: {
		transform: 'rotate(360deg)',
	},
});

const spinner = style({
	display: 'inline-block',
	animation: `${spin} 1s linear infinite`,
});

export const spinnerSizes = styleVariants({
	small: {
		width: theme.spacing[4],
		height: theme.spacing[4],
	},
	medium: {
		width: theme.spacing[6],
		height: theme.spacing[6],
	},
	large: {
		width: theme.spacing[8],
		height: theme.spacing[8],
	},
});

export default {
	spinner,
	spinnerSizes,
};
