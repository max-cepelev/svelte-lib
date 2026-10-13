import type { HTMLAttributes } from 'svelte/elements';

export type ProgressBarProps = Omit<
	HTMLAttributes<HTMLDivElement>,
	'children'
> & {
	/** Current progress from 0 to 100. */
	value: number;
	ref?: HTMLDivElement | null;
};
