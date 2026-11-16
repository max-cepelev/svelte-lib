const ITEM_SELECTOR = '[data-slot="toggle-group-item"]';
const SCROLL_TOLERANCE = 1;

function getRevealDelta(
	list: HTMLElement,
	item: HTMLElement,
	horizontal: boolean,
	styles: CSSStyleDeclaration,
) {
	const viewport = list.getBoundingClientRect();
	const target = item.getBoundingClientRect();
	const start = horizontal ? viewport.left : viewport.top;
	const end = horizontal ? viewport.right : viewport.bottom;
	const targetStart = horizontal ? target.left : target.top;
	const targetEnd = horizontal ? target.right : target.bottom;
	const paddingStart =
		Number.parseFloat(
			horizontal ? styles.scrollPaddingLeft : styles.scrollPaddingTop,
		) || 0;
	const paddingEnd =
		Number.parseFloat(
			horizontal ? styles.scrollPaddingRight : styles.scrollPaddingBottom,
		) || 0;
	const visibleStart = start + paddingStart;
	const visibleEnd = end - paddingEnd;

	// An oversized option cannot fit: reveal its beginning rather than its end.
	if (
		targetEnd - targetStart > visibleEnd - visibleStart ||
		targetStart < visibleStart
	) {
		return targetStart - visibleStart;
	}
	return targetEnd > visibleEnd ? targetEnd - visibleEnd : 0;
}

export function observeViewport(list: HTMLElement) {
	let frame = 0;
	let initial = true;
	let needsReveal = true;
	let previousActive = new Set<HTMLElement>();
	let selected: HTMLElement | undefined;

	const update = () => {
		frame = 0;
		const active = Array.from(
			list.querySelectorAll<HTMLElement>(`${ITEM_SELECTOR}[data-state="on"]`),
		);
		if (selected && !active.includes(selected)) selected = undefined;
		for (const item of active) {
			if (!previousActive.has(item)) {
				selected = item;
				needsReveal = true;
			}
		}
		previousActive = new Set(active);

		const horizontal = list.dataset.orientation !== 'vertical';
		const styles = getComputedStyle(list);
		const maxScroll = Math.max(
			0,
			horizontal
				? list.scrollWidth - list.clientWidth
				: list.scrollHeight - list.clientHeight,
		);
		const rawOffset = horizontal ? list.scrollLeft : list.scrollTop;
		const offset = Math.max(
			0,
			Math.min(
				maxScroll,
				horizontal && styles.direction === 'rtl'
					? maxScroll + rawOffset
					: rawOffset,
			),
		);
		const delta =
			needsReveal && selected && maxScroll > SCROLL_TOLERANCE
				? getRevealDelta(list, selected, horizontal, styles)
				: 0;

		list.toggleAttribute('data-overflow-start', offset > SCROLL_TOLERANCE);
		list.toggleAttribute(
			'data-overflow-end',
			maxScroll - offset > SCROLL_TOLERANCE,
		);
		needsReveal = false;

		if (Math.abs(delta) > SCROLL_TOLERANCE) {
			const behavior: ScrollBehavior =
				initial || window.matchMedia('(prefers-reduced-motion: reduce)').matches
					? 'instant'
					: 'smooth';
			list.scrollBy(
				horizontal ? { left: delta, behavior } : { top: delta, behavior },
			);
		}
		initial = false;
	};

	const schedule = () => {
		if (!frame) frame = requestAnimationFrame(update);
	};
	const resizeObserver = new ResizeObserver(() => {
		needsReveal = true;
		schedule();
	});
	const observeSizes = () => {
		resizeObserver.disconnect();
		resizeObserver.observe(list);
		for (const item of list.querySelectorAll(ITEM_SELECTOR)) {
			resizeObserver.observe(item);
		}
	};
	const mutationObserver = new MutationObserver((entries) => {
		if (entries.some((entry) => entry.type === 'childList')) observeSizes();
		if (entries.some((entry) => entry.attributeName === 'data-orientation'))
			needsReveal = true;
		schedule();
	});

	observeSizes();
	mutationObserver.observe(list, {
		subtree: true,
		childList: true,
		attributes: true,
		attributeFilter: ['data-state', 'data-orientation'],
	});
	list.addEventListener('scroll', schedule, { passive: true });
	list.addEventListener('transitionend', schedule);
	schedule();

	return () => {
		cancelAnimationFrame(frame);
		resizeObserver.disconnect();
		mutationObserver.disconnect();
		list.removeEventListener('scroll', schedule);
		list.removeEventListener('transitionend', schedule);
		list.removeAttribute('data-overflow-start');
		list.removeAttribute('data-overflow-end');
	};
}
