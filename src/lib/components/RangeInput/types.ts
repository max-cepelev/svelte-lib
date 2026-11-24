import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '../../types.ts';

export type RangeInputSize = 'small' | 'medium' | 'large';
export type RangeInputValue = [number, number];

export interface RangeInputProps
	extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
	value?: number[];
	min: number;
	max: number;
	step?: number;
	/** Label displayed before the range. */
	title?: string;
	unit?: string;
	width?: number | string;
	size?: RangeInputSize;
	isActive?: boolean;
	onValueChange?: (value: RangeInputValue) => void;
	onValueCommit?: (value: RangeInputValue) => void;
	minInputId?: string;
	maxInputId?: string;
}
