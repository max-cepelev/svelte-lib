import {
	type ComplexStyleRule,
	style,
	styleVariants,
} from '@vanilla-extract/css';
import { theme } from '../../theme.css.js';
import type { PlaceholderSize } from './types.js';

const wrapper = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	width: '100%',
	height: '100%',
	padding: theme.spacing[4],
	backgroundColor: theme.colors.background.paper,
	'@media': {
		'(max-width: 560px)': {
			display: 'grid',
			gridTemplateColumns: '100%',
			gridTemplateRows: '1fr max-content',
			gap: theme.spacing[4],
		},
	},
});

const sizes = styleVariants<Record<PlaceholderSize, ComplexStyleRule>>({
	small: {
		gap: theme.spacing[4],
	},
	medium: {
		gap: theme.spacing[8],
	},
	large: {
		gap: theme.spacing[10],
	},
});

const innerContainer = style({
	margin: '0 auto',
});

const descriptionClass = style({
	textAlign: 'center',
	display: 'block',
	color: theme.colors.text.secondary,
});

const footerClass = style({
	display: 'flex',
	flexWrap: 'wrap',
	justifyContent: 'center',
	color: theme.colors.text.secondary,
	gap: theme.spacing[2],
});

export default {
	wrapper,
	sizes,
	innerContainer,
	descriptionClass,
	footerClass,
};
