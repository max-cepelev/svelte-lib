import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

const title = style({
	lineHeight: theme.lineHeight.none,
	fontWeight: theme.fontWeight.semibold,
	fontSize: theme.fontSize.base,
});

export default {
	title,
};
