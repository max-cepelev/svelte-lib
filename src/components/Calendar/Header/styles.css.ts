import { style } from '@vanilla-extract/css';
import { theme } from '../../../theme.css.js';

const header = style({
	display: 'flex',
	height: 'var(--cell-size)',
	width: '100%',
	alignItems: 'center',
	justifyContent: 'center',
	gap: '0.375rem',
	fontSize: theme.fontSize.sm,
	fontWeight: theme.fontWeight.medium,
});

export default {
	header,
};
