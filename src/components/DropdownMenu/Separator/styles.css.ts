import { style } from '@vanilla-extract/css';
import { theme } from '../../../theme.css.js';
import { negativeSpacing } from '../../../utils.js';

const separator = style({
	backgroundColor: theme.colors.border,
	marginLeft: negativeSpacing(1),
	marginRight: negativeSpacing(1),
	marginTop: theme.spacing[1],
	marginBottom: theme.spacing[1],
	height: '1px',
});

export default {
	separator,
};
