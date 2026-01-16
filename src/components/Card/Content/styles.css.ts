import { style } from '@vanilla-extract/css';
import { theme } from '../../../theme.css.js';

const content = style({
	paddingLeft: theme.spacing[6],
	paddingRight: theme.spacing[6],
});

export default {
	content,
};
