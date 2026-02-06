import type { WithElementRef } from '~/types';
import type { HTMLAnchorAttributes } from 'svelte/elements';

export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

export interface BadgeProps extends WithElementRef<HTMLAnchorAttributes> {
	variant?: BadgeVariant;
}
