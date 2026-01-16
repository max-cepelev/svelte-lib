import { style } from '@vanilla-extract/css';

const action = style({
	gridColumn: 2,
	gridRowStart: 1,
	gridRowEnd: 'span 2',
	justifySelf: 'end',
	alignSelf: 'start',
});

export default {
	action,
};
