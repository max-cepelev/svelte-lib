import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';
import { negativeSpacing } from '~/utils';

const separator = style({
	backgroundColor: theme.colors.border,
	pointerEvents: 'none',
	marginLeft: negativeSpacing(1),
	marginRight: negativeSpacing(1),
	marginTop: theme.spacing[1],
	marginBottom: theme.spacing[1],
	height: '1px',
});

export default {
	separator,
};
