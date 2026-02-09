import type { HTMLAnchorAttributes } from 'svelte/elements';
import type { WithElementRef } from '../../types.ts';

export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

export interface BadgeProps extends WithElementRef<HTMLAnchorAttributes> {
	variant?: BadgeVariant;
}
