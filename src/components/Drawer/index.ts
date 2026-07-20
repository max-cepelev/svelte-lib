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

type DrawerComponents = {
	Root: typeof Root;
	Trigger: typeof Trigger;
	Close: typeof Close;
	Content: typeof Content;
	Overlay: typeof Overlay;
	Portal: typeof Portal;
	Header: typeof Header;
	Footer: typeof Footer;
	Title: typeof Title;
	Description: typeof Description;
};

const Drawer: DrawerComponents = {
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
export { Drawer };
