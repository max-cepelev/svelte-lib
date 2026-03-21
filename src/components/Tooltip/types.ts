import type { Placement } from '@floating-ui/dom';
import type { Snippet } from 'svelte';

export type TooltipProps = {
	delayDuration?: number;
	content?: Snippet<[]> | string;
	children?: Snippet<[]>;
	arrow?: boolean;
	offset?: number;
	class?: string;
	arrowClass?: string;
	placement?: Placement;
};
