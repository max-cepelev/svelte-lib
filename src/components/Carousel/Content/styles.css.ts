import { style, styleVariants } from '@vanilla-extract/css';
import { theme } from '~/theme';

const content = style({
	display: 'flex',
	overflow: 'hidden',
	height: '100%',
	width: '100%',
	scrollBehavior: 'smooth',
	WebkitOverflowScrolling: 'touch',
	overscrollBehavior: 'contain',
	scrollbarWidth: 'none',
	selectors: {
		'&::-webkit-scrollbar': {
			display: 'none',
		},
	},
});

const orientation = styleVariants({
	horizontal: {
		overflowX: 'auto',
		overflowY: 'hidden',
		flexDirection: 'row',
		scrollSnapType: 'x mandatory',
		columnGap: theme.spacing[4],
	},
	vertical: {
		overflowY: 'auto',
		overflowX: 'hidden',
		flexDirection: 'column',
		scrollSnapType: 'y mandatory',
		rowGap: theme.spacing[4],
	},
});

export default {
	content,
	orientation,
};
