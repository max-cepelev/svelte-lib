import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '~/types';

export type ItemVariant = 'default' | 'outline' | 'muted';
export type ItemSize = 'default' | 'small';

export interface ItemProps
	extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
	child?: Snippet<[{ props: Record<string, unknown> }]>;
	variant?: ItemVariant;
	size?: ItemSize;
}

export type ItemMediaVariant = 'default' | 'icon' | 'image';

export interface ItemMediaProps
	extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
	variant?: ItemMediaVariant;
}
