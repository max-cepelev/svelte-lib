import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

const content = style({
	paddingLeft: theme.spacing[6],
	paddingRight: theme.spacing[6],
});

export default {
	content,
};
