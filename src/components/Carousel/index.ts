import { Arrows } from './Arrows/index.js';
import Root from './Carousel.svelte';
import { Content } from './Content/index.js';
import { Dots } from './Dots/index.js';
import { Item } from './Item/index.js';

export const Carousel = {
	Root,
	Content,
	Item,
	Arrows,
	Dots,
};

export type * from './types.js';
