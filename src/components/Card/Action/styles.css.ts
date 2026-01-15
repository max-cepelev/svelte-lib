import { style } from '~/styles/index.js';

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
