import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '~/types';

export type EmptyMediaVariant = 'default' | 'icon';

export interface EmptyMediaProps
	extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
	variant?: EmptyMediaVariant;
}
