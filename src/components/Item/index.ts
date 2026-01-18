import Root from './Item.svelte';
import { Group } from './Group/index.js';
import { Separator } from './Separator/index.js';
import { Header } from './Header/index.js';
import { Footer } from './Footer/index.js';
import { Content } from './Content/index.js';
import { Title } from './Title/index.js';
import { Description } from './Description/index.js';
import { Actions } from './Actions/index.js';
import { Media } from './Media/index.js';

export const Item = {
	Root,
	Group,
	Separator,
	Header,
	Footer,
	Content,
	Title,
	Description,
	Actions,
	Media,
};

export type * from './types.js';
