import { Actions } from './Actions';
import { Content } from './Content';
import { Description } from './Description';
import { Footer } from './Footer';
import { Group } from './Group';
import { Header } from './Header';
import Root from './Item.svelte';
import { Media } from './Media';
import { Separator } from './Separator';
import { Title } from './Title';

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

export type * from './types';
