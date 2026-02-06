import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

const gridRow = style({
	display: 'flex',
	columnGap: theme.spacing[1],
});

export default {
	gridRow,
};
