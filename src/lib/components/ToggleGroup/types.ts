import type { ToggleGroup as ToggleGroupPrimitive } from 'bits-ui';
import type { Snippet } from 'svelte';
import type { ButtonSize } from '../Button';

export type ToggleGroupValue = string | number;
export type ToggleGroupVariant = 'default' | 'group';
export type ToggleGroupSize = ButtonSize;

export type ToggleGroupOption<T extends ToggleGroupValue = ToggleGroupValue> = {
	value: T;
	label: string | Snippet;
	disabled?: boolean;
	title?: string;
	ariaLabel?: string;
	startAdornment?: Snippet;
	endAdornment?: Snippet;
};

export type ToggleGroupSelection<
	T extends ToggleGroupValue,
	Multiple extends boolean,
> = Multiple extends true ? T[] : T;

export type ToggleGroupProps<
	T extends ToggleGroupValue = ToggleGroupValue,
	Multiple extends boolean = false,
> = Omit<
	ToggleGroupPrimitive.RootProps,
	'type' | 'value' | 'onValueChange' | 'child' | 'children'
> & {
	options: readonly ToggleGroupOption<T>[];
	value?: ToggleGroupSelection<T, Multiple>;
	onChange?: (value: ToggleGroupSelection<T, Multiple>) => void;
	multiple?: Multiple;
	variant?: ToggleGroupVariant;
	size?: ToggleGroupSize;
	label?: string;
};
