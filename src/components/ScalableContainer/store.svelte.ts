import type { ScalableContainerProps } from './types';

export interface Position {
	x: number;
	y: number;
}

const DEFAULT_POSITION: Position = { x: 0, y: 0 };
const OVERLAY_TIMEOUT = 1500;
const DRAG_THRESHOLD = 4;
const ZOOM_FACTOR = 1.5;
const WHEEL_ZOOM_FACTOR = 0.05;

function clampScale(value: number, minScale: number, maxScale: number): number {
	return Math.max(minScale, Math.min(maxScale, value));
}

export class ScalableContainerStore {
	readonly #props;
	readonly meta: string;

	scale = $state<number>(1);
	position = $state<Position>(DEFAULT_POSITION);
	#isDragging = $state<boolean>(false);
	showOverlay = $state<boolean>(false);

	#dragStart: Position = DEFAULT_POSITION;
	#dragOrigin: Position = DEFAULT_POSITION;
	#didDrag = false;
	#activePointers = new Map<number, Position>();
	#initialPinchDistance = 0;
	#initialPinchScale = 1;
	#overlayTimeout: ReturnType<typeof setTimeout> | undefined = undefined;

	pointers = $derived(this.#activePointers);

	transform = $derived(
		`translate(${this.position.x}px, ${this.position.y}px) scale(${this.scale})`,
	);

	transition = $derived(this.#isDragging ? 'none' : 'transform 0.1s ease-out');

	cursor = $derived(this.#isDragging ? 'grabbing' : 'grab');

	constructor(
		props: Pick<
			ScalableContainerProps,
			| 'initialScale'
			| 'minScale'
			| 'maxScale'
			| 'onScaleChanged'
			| 'onPositionChanged'
		>,
	) {
		this.#props = props;
		this.scale = clampScale(
			this.#props.initialScale || 1,
			this.#props.minScale || 0.1,
			this.#props.maxScale || 4,
		);
		this.#initialPinchScale = this.scale;
		this.meta =
			typeof window !== 'undefined' &&
			window.navigator &&
			/Mac/i.test(navigator.userAgent)
				? '⌘'
				: 'ctrl';
	}

	#setScale = (value: number) => {
		this.scale = clampScale(
			value,
			this.#props.minScale || 0.1,
			this.#props.maxScale || 4,
		);
		this.#props.onScaleChanged?.(this.scale);
	};

	#setPosition = (pos: Position) => {
		this.position = pos;
		this.#props.onPositionChanged?.(pos);
	};

	zoomIn = () => {
		this.#setScale(this.scale * ZOOM_FACTOR);
	};

	zoomOut = () => {
		this.#setScale(this.scale / ZOOM_FACTOR);
	};

	reset = (): void => {
		this.#setScale(this.#props.initialScale || 1);
		this.#setPosition(DEFAULT_POSITION);
	};

	center = () => {
		this.#setPosition(DEFAULT_POSITION);
	};

	startDrag = (pointerId: number, x: number, y: number) => {
		this.#activePointers.set(pointerId, { x, y });

		if (this.#activePointers.size === 1) {
			this.#dragOrigin = { x, y };
			this.#dragStart = {
				x: x - this.position.x,
				y: y - this.position.y,
			};
		}
	};

	moveDrag = (pointerId: number, x: number, y: number): boolean => {
		if (!this.#activePointers.has(pointerId)) return false;
		this.#activePointers.set(pointerId, { x, y });

		if (this.#activePointers.size !== 1) return false;

		let startedDragging = false;

		if (!this.#isDragging) {
			const deltaX = x - this.#dragOrigin.x;
			const deltaY = y - this.#dragOrigin.y;

			if (Math.sqrt(deltaX * deltaX + deltaY * deltaY) < DRAG_THRESHOLD) {
				return false;
			}

			this.#isDragging = true;
			this.#didDrag = true;
			startedDragging = true;
		}

		this.#setPosition({
			x: x - this.#dragStart.x,
			y: y - this.#dragStart.y,
		});

		return startedDragging;
	};

	endDrag = (pointerId: number) => {
		this.#activePointers.delete(pointerId);

		const remainingPointer = this.#activePointers.values().next().value;

		if (remainingPointer) {
			this.#dragOrigin = remainingPointer;
			this.#dragStart = {
				x: remainingPointer.x - this.position.x,
				y: remainingPointer.y - this.position.y,
			};
		}

		this.#isDragging = false;

		window.setTimeout(() => {
			this.#didDrag = false;
		});
	};

	consumeClickAfterDrag = (): boolean => {
		if (!this.#didDrag) return false;

		this.#didDrag = false;
		return true;
	};

	startPinch = (t1: Touch, t2: Touch) => {
		this.#initialPinchDistance = this.#getDistance(t1, t2);
		this.#initialPinchScale = this.scale;
	};

	movePinch = (t1: Touch, t2: Touch) => {
		if (this.#initialPinchDistance === 0) return;
		const dist = this.#getDistance(t1, t2);
		this.#setScale(
			this.#initialPinchScale * (dist / this.#initialPinchDistance),
		);
	};

	endPinch = () => {
		this.#initialPinchDistance = 0;
	};

	wheel = (deltaY: number, metaKey: boolean) => {
		if (metaKey) {
			this.showOverlay = false;
			this.#setScale(this.scale - deltaY * WHEEL_ZOOM_FACTOR);
		} else {
			this.showOverlay = true;
			clearTimeout(this.#overlayTimeout);
			this.#overlayTimeout = setTimeout(() => {
				this.showOverlay = false;
			}, OVERLAY_TIMEOUT);
		}
	};

	destroy = () => {
		clearTimeout(this.#overlayTimeout);
	};

	#getDistance = (t1: Touch, t2: Touch): number => {
		const dx = t1.clientX - t2.clientX;
		const dy = t1.clientY - t2.clientY;
		return Math.sqrt(dx * dx + dy * dy);
	};
}
