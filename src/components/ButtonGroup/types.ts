import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '~/types';

export type ButtonGroupOrientation = 'horizontal' | 'vertical';

export interface ButtonGroupProps
	extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
	orientation?: ButtonGroupOrientation;
}
