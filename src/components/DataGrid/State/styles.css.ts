import { style } from '~/styles/index.js';

const container = style({
	width: '100%',
	height: '100%',
});

const loader = style({
	height: '100%',
	minHeight: 50,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
});

export default {
	container,
	loader,
};
