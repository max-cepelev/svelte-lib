import type {
	HTMLAttributes,
	HTMLInputAttributes,
	HTMLTextareaAttributes,
} from 'svelte/elements';
import type { WithElementRef } from '../../types.ts';
import type { ButtonProps } from '../Button/types';

export type InputGroupAddonAlign =
	| 'inline-start'
	| 'inline-end'
	| 'block-start'
	| 'block-end';

export interface InputGroupProps
	extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
	disabled?: boolean;
}

export interface InputGroupAddonProps
	extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
	align?: InputGroupAddonAlign;
}

export type InputGroupButtonSize = 'xs' | 'sm' | 'icon-xs' | 'icon-sm';

export type InputGroupButtonProps = Omit<ButtonProps, 'size'> & {
	size?: InputGroupButtonSize;
};

export type InputGroupInputProps = WithElementRef<HTMLInputAttributes>;

export type InputGroupTextareaProps = WithElementRef<HTMLTextareaAttributes>;

export type InputGroupTextProps = WithElementRef<
	HTMLAttributes<HTMLSpanElement>
>;
