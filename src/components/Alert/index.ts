import Root from './Alert.svelte';
import { Description } from './Description';
import { alertVariants } from './styles.css';
import { Title } from './Title';

const Alert = {
	Root,
	Title,
	Description,
};

export { Alert, alertVariants };

export type * from './types';
