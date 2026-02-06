import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

const description = style({
	fontSize: theme.fontSize.sm,
	color: theme.colors.text.secondary,
});

export default {
	description,
};
