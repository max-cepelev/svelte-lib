type ActiveIndicatorOptions = {
	itemSelector: string;
	activeState: string;
	cssVariablePrefix: string;
};

// Offsets are relative to the positioned list, including its scrollable content.
export function observeActiveIndicator(
	list: HTMLElement,
	{ itemSelector, activeState, cssVariablePrefix }: ActiveIndicatorOptions,
) {
	let frame = 0;
	let readyFrame = 0;

	const update = () => {
		frame = 0;
		const active = list.querySelector<HTMLElement>(
			`${itemSelector}[data-state="${activeState}"]`,
		);

		if (!active) {
			cancelAnimationFrame(readyFrame);
			readyFrame = 0;
			list.removeAttribute('data-indicator-ready');
			return;
		}

		const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = active;
		list.style.setProperty(`${cssVariablePrefix}-x`, `${offsetLeft}px`);
		list.style.setProperty(`${cssVariablePrefix}-y`, `${offsetTop}px`);
		list.style.setProperty(`${cssVariablePrefix}-width`, `${offsetWidth}px`);
		list.style.setProperty(`${cssVariablePrefix}-height`, `${offsetHeight}px`);
		if (!list.hasAttribute('data-indicator-ready')) {
			list.setAttribute('data-indicator-ready', '');
			// Paint the initial position before enabling transitions.
			readyFrame = requestAnimationFrame(() => {
				readyFrame = 0;
				list.setAttribute('data-indicator-ready', 'true');
			});
		}
	};

	const schedule = () => {
		if (!frame) frame = requestAnimationFrame(update);
	};

	const resizeObserver = new ResizeObserver(schedule);
	const observeSizes = () => {
		resizeObserver.disconnect();
		resizeObserver.observe(list);
		for (const item of list.querySelectorAll(itemSelector)) {
			resizeObserver.observe(item);
		}
	};

	const mutationObserver = new MutationObserver((entries) => {
		if (entries.some((entry) => entry.type === 'childList')) observeSizes();
		schedule();
	});

	observeSizes();
	mutationObserver.observe(list, {
		subtree: true,
		childList: true,
		attributes: true,
		attributeFilter: ['data-state'],
	});
	schedule();

	return () => {
		cancelAnimationFrame(frame);
		cancelAnimationFrame(readyFrame);
		resizeObserver.disconnect();
		mutationObserver.disconnect();
		list.removeAttribute('data-indicator-ready');
		for (const property of ['x', 'y', 'width', 'height']) {
			list.style.removeProperty(`${cssVariablePrefix}-${property}`);
		}
	};
}
