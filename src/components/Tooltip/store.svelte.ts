import {
	autoUpdate,
	computePosition,
	flip,
	offset,
	shift,
} from '@floating-ui/dom';
import type { TooltipProps } from './types';

type Options = Pick<TooltipProps, 'delayDuration' | 'placement' | 'offset'>;

export class TooltipStore {
	open = $state(false);
	visible = $state(false);
	x = $state(0);
	y = $state(0);
	#options = $state<Options>({
		delayDuration: 300,
		placement: 'top',
		offset: 8,
	});

	readonly tooltipId = `tooltip-${Math.random().toString(36).slice(2, 11)}`;

	private static active: TooltipStore | null = null;
	private static readonly CLOSE_DURATION = 150;
	private triggerEl: HTMLElement | undefined;
	private cleanupAutoUpdate: (() => void) | undefined;
	private delayTimer: ReturnType<typeof setTimeout> | undefined;
	private closeTimer: ReturnType<typeof setTimeout> | undefined;

	constructor(options: Options) {
		this.#options = { ...this.#options, ...options };
	}

	public get placement() {
		return this.#options.placement;
	}

	show = () => {
		if (TooltipStore.active && TooltipStore.active !== this) {
			TooltipStore.active.forceClose();
		}
		clearTimeout(this.closeTimer);
		clearTimeout(this.delayTimer);
		TooltipStore.active = this;

		this.delayTimer = setTimeout(() => {
			this.visible = true;
			this.open = true;
		}, this.#options.delayDuration);
	};

	hide = () => {
		clearTimeout(this.delayTimer);
		if (TooltipStore.active === this) TooltipStore.active = null;
		this.open = false;

		this.closeTimer = setTimeout(() => {
			this.visible = false;
		}, TooltipStore.CLOSE_DURATION);
	};

	keepOpen = () => {
		clearTimeout(this.closeTimer);
		clearTimeout(this.delayTimer);
		this.open = true;
		TooltipStore.active = this;
	};

	attachTrigger = (node: HTMLElement) => {
		const el = node.firstElementChild as HTMLElement | null;
		if (!el) return;
		this.triggerEl = el;

		el.addEventListener('mouseenter', this.show);
		el.addEventListener('mouseleave', this.hide);
		el.addEventListener('focusin', this.show);
		el.addEventListener('focusout', this.hide);
		el.setAttribute('aria-describedby', this.tooltipId);

		return () => {
			el.removeEventListener('mouseenter', this.show);
			el.removeEventListener('mouseleave', this.hide);
			el.removeEventListener('focusin', this.show);
			el.removeEventListener('focusout', this.hide);
			el.removeAttribute('aria-describedby');
			this.triggerEl = undefined;
		};
	};

	attachContent = (node: HTMLElement) => {
		if (!this.triggerEl) return;

		this.cleanupAutoUpdate = autoUpdate(this.triggerEl, node, () => {
			if (!this.triggerEl) return;

			computePosition(this.triggerEl, node, {
				placement: this.#options.placement,
				strategy: 'fixed',
				middleware: [
					offset({
						mainAxis: this.#options.offset,
					}),
					flip(),
					shift({ padding: 8 }),
				],
			}).then(({ x, y, placement }) => {
				this.x = x;
				this.y = y;
				this.#options.placement = placement;
			});
		});

		return () => {
			this.cleanupAutoUpdate?.();
			this.cleanupAutoUpdate = undefined;
		};
	};

	destroy() {
		this.forceClose();
	}

	private forceClose() {
		clearTimeout(this.delayTimer);
		clearTimeout(this.closeTimer);
		if (TooltipStore.active === this) TooltipStore.active = null;
		this.open = false;
		this.visible = false;
		this.cleanupAutoUpdate?.();
		this.cleanupAutoUpdate = undefined;
	}
}
