import { Content } from './Content/index.js';
import { Description } from './Description/index.js';
import Item from './Field.svelte';
import { FieldError } from './FieldError/index.js';
import { FieldSet } from './FieldSet/index.js';
import { Group } from './Group/index.js';
import { Label } from './Label/index.js';
import { Legend } from './Legend/index.js';
import { Separator } from './Separator/index.js';
import { Title } from './Title/index.js';

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

export * from './types.js';
