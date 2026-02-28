import type { ScalableContainerProps } from './types';

export interface Position {
	x: number;
	y: number;
}

export class ScalableContainerStore {
	readonly initialScale: number;
	readonly minScale: number;
	readonly maxScale: number;
	readonly meta: string;

	readonly #onScaleChanged: ((scale: number) => void) | undefined;
	readonly #onPositionChanged: ((pos: Position) => void) | undefined;

	scale = $state<number>(1);
	position = $state<Position>({ x: 0, y: 0 });
	#isDragging = $state<boolean>(false);
	showOverlay = $state<boolean>(false);

	// Не реактивные — нужны только во время жеста
	#dragStart: Position = { x: 0, y: 0 };
	#activePointers = new Map<number, { x: number; y: number }>();
	#initialPinchDistance: number = 0;
	#initialPinchScale: number = 1;

	pointers = $derived(this.#activePointers);

	trnsform = $derived(
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
		this.initialScale = props.initialScale ?? 1;
		this.scale = props.initialScale ?? 1;
		this.minScale = props.minScale ?? 0.1;
		this.maxScale = props.maxScale ?? 4;
		this.#onScaleChanged = props.onScaleChanged;
		this.#onPositionChanged = props.onPositionChanged;
		this.meta =
			typeof window !== 'undefined' &&
			window.navigator &&
			/Mac/i.test(navigator.userAgent)
				? '⌘'
				: 'ctrl';
	}

	// ── Внутренние сеттеры ────────────────────────────────────────────────

	#setScale = (value: number) => {
		this.scale = Math.max(this.minScale, Math.min(this.maxScale, value));
		this.#onScaleChanged?.(this.scale);
	};

	#setPosition = (pos: Position) => {
		this.position = pos;
		this.#onPositionChanged?.(pos);
	};

	// ── Публичные действия ────────────────────────────────────────────────

	zoomIn = () => {
		this.#setScale(this.scale * 1.5);
	};

	zoomOut = () => {
		this.#setScale(this.scale / 1.5);
	};

	reset = (): void => {
		this.#setScale(this.initialScale);
		this.#setPosition({ x: 0, y: 0 });
	};

	center = () => {
		this.#setPosition({ x: 0, y: 0 });
	};

	// ── Drag: принимает координаты, а не события ──────────────────────────
	// setPointerCapture живёт в компоненте — класс не знает про DOM

	startDrag = (pointerId: number, x: number, y: number) => {
		this.#activePointers.set(pointerId, { x, y });

		// Начинать drag только если это единственный палец/курсор
		if (this.#activePointers.size === 1) {
			this.#isDragging = true;
			this.#dragStart = {
				x: x - this.position.x,
				y: y - this.position.y,
			};
		}
	};

	moveDrag = (pointerId: number, x: number, y: number) => {
		if (!this.#activePointers.has(pointerId)) return;
		this.#activePointers.set(pointerId, { x, y });

		if (this.#activePointers.size === 1) {
			this.#setPosition({
				x: x - this.#dragStart.x,
				y: y - this.#dragStart.y,
			});
		}
	};

	endDrag = (pointerId: number) => {
		this.#isDragging = false;
		this.#activePointers.delete(pointerId);
	};

	// ── Pinch-to-zoom ─────────────────────────────────────────────────────

	startPinch = (t1: Touch, t2: Touch) => {
		this.#initialPinchDistance = this.#getDistance(t1, t2);
		this.#initialPinchScale = this.scale;
	};

	movePinch = (t1: Touch, t2: Touch) => {
		if (this.#initialPinchDistance === 0) return;
		const dist = this.#getDistance(t1, t2);
		console.log({ dist });
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
			this.#setScale(this.scale - deltaY * 0.05);
		} else {
			this.showOverlay = true;
			clearTimeout(this.#overlayTimeout);
			this.#overlayTimeout = setTimeout(() => {
				this.showOverlay = false;
			}, 1500);
		}
	};

	#overlayTimeout: ReturnType<typeof setTimeout> | undefined = undefined;

	// ── Helpers ───────────────────────────────────────────────────────────

	#getDistance = (t1: Touch, t2: Touch): number => {
		const dx = t1.clientX - t2.clientX;
		const dy = t1.clientY - t2.clientY;
		return Math.sqrt(dx * dx + dy * dy);
	};
}
