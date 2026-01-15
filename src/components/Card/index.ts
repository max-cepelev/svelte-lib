import { Action } from './Action/index.js';
import Root from './Card.svelte';
import { Content } from './Content/index.js';
import { Description } from './Description/index.js';
import { Footer } from './Footer/index.js';
import { Header } from './Header/index.js';
import { Title } from './Title/index.js';

const Card = {
	Root,
	Header,
	Title,
	Description,
	Content,
	Footer,
	Action,
};

export { Card };

export type * from './types.js';
