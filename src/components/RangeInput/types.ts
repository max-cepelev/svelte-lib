import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '../../types.ts';

export type RangeInputSize = 'small' | 'medium' | 'large';

export interface RangeInputProps
	extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
	minValue?: number;
	maxValue?: number;
	min: number;
	max: number;
	step?: number;
	unit?: string;
	width?: number | string;
	size?: RangeInputSize;
	isActive?: boolean;
	onValueChange?: (value: number[]) => void;
	id?: string;
}
