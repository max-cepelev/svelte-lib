import type { WithElementRef } from '~/types';
import type { HTMLAttributes } from 'svelte/elements';

export type ButtonGroupOrientation = 'horizontal' | 'vertical';

export interface ButtonGroupProps
	extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
	orientation?: ButtonGroupOrientation;
}
