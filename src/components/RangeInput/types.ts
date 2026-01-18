import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '../../types.js';

export type RangeInputSize = 'small' | 'medium' | 'large';

export interface RangeInputProps extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
	minValue?: number;
	maxValue?: number;
	min: number;
	max: number;
	label?: string;
	unit?: string;
	width?: number | string;
	size?: RangeInputSize;
	isActive?: boolean;
	minInputRef?: HTMLInputElement | null;
	maxInputRef?: HTMLInputElement | null;
}