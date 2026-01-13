import type { Tooltip } from 'bits-ui';
import type { Snippet } from 'svelte';

export type TooltipProps = Tooltip.RootProps & {
	content?: Snippet<[]> | string;
	arrow?: boolean;
	align?: Tooltip.ContentProps['align'];
	sideOffset?: number;
	alignOffset?: number;
	side?: Tooltip.ContentProps['side'];
	class?: string;
};
