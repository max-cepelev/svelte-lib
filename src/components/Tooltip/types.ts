import type { Placement } from '@floating-ui/dom';
import type { Snippet } from 'svelte';

export type TooltipProps = {
	delayDuration?: number;
	content?: Snippet<[]> | string;
	children?: Snippet<[{ attach: (node: HTMLElement) => void }]>;
	arrow?: boolean;
	offset?: number;
	arrowClass?: string;
	contentClass?: string;
	placement?: Placement;
};
