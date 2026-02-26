import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';
import { spacing } from '~/utils';

const toolbar = style({
	position: 'absolute',
	top: 0,
	right: 4,
	zIndex: 1,
	opacity: 0.5,
	transition: 'opacity 0.2s ease-in-out',
	':hover': {
		opacity: 1,
	},
	'@media': {
		'(min-width: 48rem)': {
			top: '50%',
			bottom: 'unset',
			transform: 'translateY(-50%)',
		},
	},
});

const viewport = style({
	width: '100%',
	height: '100%',
	overflow: 'hidden',
	position: 'relative',
	touchAction: 'none',
});

const contentWrapper = style({
	position: 'absolute',
	inset: 0,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	userSelect: 'none',
});

const overlay = style({
	position: 'absolute',
	bottom: 16,
	left: '50%',
	transform: 'translateX(-50%)',
	backgroundColor: 'rgba(0, 0, 0, 0.7)',
	color: 'white',
	padding: spacing(2, 4),
	borderRadius: theme.radius.small,
	fontSize: theme.fontSize.sm,
	pointerEvents: 'none',
	zIndex: 10,
	opacity: 0,
	transition: 'opacity 0.2s ease-in-out',
	selectors: {
		'&[data-visible="true"]': {
			opacity: 1,
		},
	},
});

export default {
	toolbar,
	viewport,
	contentWrapper,
	overlay,
};
