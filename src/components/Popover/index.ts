import Root from './Popover.svelte';
import { Content } from './Content/index.js';
import { Trigger } from './Trigger/index.js';
import { Close } from './Close/index.js';
import { Portal } from './Portal/index.js';

export const Popover = {
	Root,
	Content,
	Trigger,
	Close,
	Portal,
};

export type * from './types.js';
