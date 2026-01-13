import { style, theme } from '~/styles/index.js';

const root = style({
	display: 'flex',
	width: 'fit-content',
	alignItems: 'center',
	gap: theme.spacing[2],
	fontSize: theme.fontSize.sm,
	lineHeight: theme.lineHeight.snug,
	fontWeight: theme.fontWeight.medium,
	selectors: {
		'[data-slot=field][data-disabled=true] &': {
			opacity: 0.5,
		},
	},
});

export default {
	root,
};
