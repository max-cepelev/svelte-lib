import { Group } from './Group';
import Root from './InputOTP.svelte';
import { Separator } from './Separator';
import { Slot } from './Slot';

export const InputOTP: {
	Root: typeof Root;
	Group: typeof Group;
	Slot: typeof Slot;
	Separator: typeof Separator;
} = {
	Root,
	Group,
	Slot,
	Separator,
};

export type * from './types';
