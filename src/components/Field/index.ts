import { Content } from './Content';
import { Description } from './Description';
import Item from './Field.svelte';
import { FieldError } from './FieldError';
import { FieldSet } from './FieldSet';
import { Group } from './Group';
import { Label } from './Label';
import { Legend } from './Legend';
import { Separator } from './Separator';
import { Title } from './Title';

const Field = {
	Item,
	Content,
	Description,
	Error: FieldError,
	Group,
	Label,
	Legend,
	Separator,
	Set: FieldSet,
	Title,
};

export { Field };

export * from './types';
