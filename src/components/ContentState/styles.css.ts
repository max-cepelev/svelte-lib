import { style } from '@vanilla-extract/css';

const loadingContainer = style({
	display: 'flex',
	flexGrow: 1,
	alignItems: 'center',
	justifyContent: 'center',
	width: '100%',
	height: '100%',
});

export default {
	loadingContainer,
};
