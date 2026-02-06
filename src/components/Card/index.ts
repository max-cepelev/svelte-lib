import { Action } from './Action';
import Root from './Card.svelte';
import { Content } from './Content';
import { Description } from './Description';
import { Footer } from './Footer';
import { Header } from './Header';
import { Title } from './Title';

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

export type * from './types';
