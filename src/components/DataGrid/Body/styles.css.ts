import { style } from '@vanilla-extract/css';

const container = style({
	height: '100%',
	margin: 0,
	padding: 0,
	scrollBehavior: 'smooth',
	listStyle: 'none',
});

export default {
	container,
};
