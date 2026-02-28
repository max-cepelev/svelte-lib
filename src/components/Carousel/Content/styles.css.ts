import { style, styleVariants } from '@vanilla-extract/css';
import { negativeSpacing } from '~/utils';

const contentWrapper = style({
	overflow: 'hidden',
	height: '100%',
});

const container = style({
	display: 'flex',
	height: '100%',
	width: '100%',
});

const orientation = styleVariants({
	horizontal: {
		marginLeft: negativeSpacing(4),
		flexDirection: 'row',
	},
	vertical: {
		marginTop: negativeSpacing(4),
		flexDirection: 'column',
	},
});

export default {
	contentWrapper,
	container,
	orientation,
};
