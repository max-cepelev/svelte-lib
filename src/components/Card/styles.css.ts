import { style } from '@vanilla-extract/css';
import { theme } from '~/theme';

const card = style({
	display: 'flex',
	flexDirection: 'column',
	gap: theme.spacing[6],
	borderRadius: theme.borderRadius.lg,
	border: `1px solid ${theme.colors.border}`,
	padding: `${theme.spacing[6]} 0`,
	backgroundColor: theme.colors.background.paper,
	color: theme.colors.text.primary,
	boxShadow: theme.shadow[2],
});

export default {
	card,
};
