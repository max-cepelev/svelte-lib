import type { Snippet } from 'svelte';

export type TooltipSide = 'top' | 'bottom' | 'left' | 'right';
export type TooltipAlign = 'start' | 'center' | 'end';

export type TooltipProps = {
	open?: boolean;
	delayDuration?: number;
	content?: Snippet<[]> | string;
	children?: Snippet<[]>;
	arrow?: boolean;
	align?: TooltipAlign;
	sideOffset?: number;
	alignOffset?: number;
	side?: TooltipSide;
	class?: string;
	arrowClass?: string;
};
