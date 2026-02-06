import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

const root = style({
	position: 'relative',
	marginBlock: `calc(-1 * ${theme.spacing[2]})`,
	height: theme.spacing[5],
	fontSize: theme.fontSize.sm,
	selectors: {
		'[data-slot=field-group][data-variant=outline] &': {
			marginBottom: `calc(-1 * ${theme.spacing[2]})`,
		},
	},
});

const separator = style({
	position: 'absolute',
	top: '50%',
	insetInline: 0,
});

const content = style({
	position: 'relative',
	marginInline: 'auto',
	display: 'block',
	width: 'fit-content',
	paddingInline: theme.spacing[2],
	backgroundColor: theme.colors.background.paper,
	color: theme.colors.text.secondary,
});

export default {
	root,
	separator,
	content,
};
