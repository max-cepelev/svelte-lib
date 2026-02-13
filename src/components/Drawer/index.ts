import { Close } from './Close';
import { Content } from './Content';
import { Description } from './Description';
import Root from './Drawer.svelte';
import { Footer } from './Footer';
import { Header } from './Header';
import { Overlay } from './Overlay';
import { Portal } from './Portal';
import { Title } from './Title';
import { Trigger } from './Trigger';

export const Drawer = {
	Root,
	Trigger,
	Close,
	Content,
	Overlay,
	Portal,
	Header,
	Footer,
	Title,
	Description,
};

export type * from './types';
