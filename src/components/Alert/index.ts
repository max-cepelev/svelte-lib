import Root from './Alert.svelte';
import { Description } from './Description/index.js';
import { alertVariants } from './styles.css.js';
import { Title } from './Title/index.js';

const Alert = {
	Root,
	Title,
	Description,
};

export { Alert, alertVariants };

export type * from './types.js';
