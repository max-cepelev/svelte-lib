import type { WithElementRef } from '../../types.js';
import type { HTMLAttributes } from 'svelte/elements';

export type EmptyMediaVariant = 'default' | 'icon';

export interface EmptyMediaProps extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
	variant?: EmptyMediaVariant;
}
