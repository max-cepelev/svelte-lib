type Options = {
	text?: string;
	rowsCount?: number;
	visibleLastSymbolsCount?: number;
};

type ResizeObserverData = Pick<ResizeObserverEntry, 'target' | 'contentRect'>;

const DEFAULT_ROWS_COUNT = 1;
const RESIZE_DEBOUNCE_MS = 500;

const truncateString = (visibleLastSymbolsCount: number, label: string) => {
	const firstPartLabel = label.slice(0, -visibleLastSymbolsCount);
	const secondPartLabel = label.slice(-visibleLastSymbolsCount);

	return { firstPartLabel, secondPartLabel };
};

export class OverflowTypographyStore {
	isOverflowed = $state(false);

	readonly #options: Options;
	#node: HTMLElement | undefined;
	#resizeObserver: ResizeObserver | undefined;
	#resizeTimer: ReturnType<typeof setTimeout> | undefined;

	constructor(options: Options) {
		this.#options = options;
	}

	get rowsCount() {
		return this.#options.rowsCount ?? DEFAULT_ROWS_COUNT;
	}

	get hasVisibleLastSymbols() {
		return Boolean(this.#options.text && this.visibleLastSymbolsCount > 0);
	}

	get hasMultipleRows() {
		return this.hasVisibleLastSymbols ? false : this.rowsCount > 1;
	}

	get firstPartLabel() {
		return this.truncatedLabel.firstPartLabel;
	}

	get secondPartLabel() {
		return this.truncatedLabel.secondPartLabel;
	}

	attach = (node: HTMLElement) => {
		this.#node = node;
		this.checkOverflow([
			{ target: node, contentRect: node.getBoundingClientRect() },
		]);

		this.#resizeObserver = new ResizeObserver((entries) => {
			clearTimeout(this.#resizeTimer);
			this.#resizeTimer = setTimeout(() => {
				this.checkOverflow(entries);
			}, RESIZE_DEBOUNCE_MS);
		});

		this.#resizeObserver.observe(node);

		return () => {
			this.#resizeObserver?.unobserve(node);
			this.destroy();
		};
	};

	check = () => {
		if (!this.#node) return;

		this.checkOverflow([
			{ target: this.#node, contentRect: this.#node.getBoundingClientRect() },
		]);
	};

	destroy() {
		clearTimeout(this.#resizeTimer);
		this.#resizeObserver?.disconnect();
		this.#resizeObserver = undefined;
		this.#node = undefined;
	}

	private get visibleLastSymbolsCount() {
		return this.#options.visibleLastSymbolsCount ?? 0;
	}

	private get truncatedLabel() {
		if (!this.hasVisibleLastSymbols || !this.#options.text) {
			return { firstPartLabel: '', secondPartLabel: '' };
		}

		return truncateString(this.visibleLastSymbolsCount, this.#options.text);
	}

	private checkOverflow(entries: ResizeObserverData[]) {
		const [{ target, contentRect }] = entries;

		const isScrollHeightBigger =
			target.scrollHeight > Math.round(contentRect.height);
		const isScrollWidthBigger =
			target.scrollWidth > Math.round(contentRect.width);
		const isOverflowed = this.hasMultipleRows
			? isScrollWidthBigger || isScrollHeightBigger
			: isScrollWidthBigger;

		if (this.isOverflowed !== isOverflowed) {
			this.isOverflowed = isOverflowed;
		}
	}
}
