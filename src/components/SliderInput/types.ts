import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '../../types.ts';

export type SliderInputSize = 'small' | 'medium' | 'large';

export interface SliderInputProps
	extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
	value?: number;
	min: number;
	max: number;
	step?: number;
	unit?: string;
	width?: number | string;
	size?: SliderInputSize;
	name?: string;
	isActive?: boolean;
	onValueChange?: (value: number) => void;
	onValueCommit?: (value: number) => void;
	id?: string;
}
