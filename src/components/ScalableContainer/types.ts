import type { HTMLAttributes } from 'svelte/elements';

export type ScalableContainerProps = {
	initialScale?: number;
	minScale?: number;
	maxScale?: number;
	showToolbar?: boolean;
	onScaleChanged?: (scale: number) => void;
	onPositionChanged?: (position: { x: number; y: number }) => void;
} & HTMLAttributes<HTMLDivElement>;
