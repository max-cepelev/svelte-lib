const ACTIVE_TAB_SELECTOR = '[data-slot="tabs-trigger"][data-state="active"]';

const getScrollBehavior = (): ScrollBehavior =>
	window.matchMedia('(prefers-reduced-motion: reduce)').matches
		? 'instant'
		: 'smooth';

// Shrinks the observed area to the list's content box, so a tab under the padding counts as hidden.
const getRootMargin = (list: HTMLElement) => {
	const { paddingTop, paddingRight, paddingBottom, paddingLeft } =
		getComputedStyle(list);

	return [paddingTop, paddingRight, paddingBottom, paddingLeft]
		.map((padding) => `-${padding}`)
		.join(' ');
};

const getScrollDelta = (tab: DOMRectReadOnly, root: DOMRectReadOnly) => {
	let left = 0;
	if (tab.left < root.left) left = tab.left - root.left;
	else if (tab.right > root.right) left = tab.right - root.right;

	let top = 0;
	if (tab.top < root.top) top = tab.top - root.top;
	else if (tab.bottom > root.bottom) top = tab.bottom - root.bottom;

	return { left, top };
};

// Geometry comes from IntersectionObserver entries, so no synchronous layout reads happen here.
export const observeActiveTab = (list: HTMLElement) => {
	let behavior: ScrollBehavior = 'instant';

	const intersectionObserver = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				intersectionObserver.unobserve(entry.target);
				if (entry.intersectionRatio === 1 || !entry.rootBounds) continue;

				const { left, top } = getScrollDelta(
					entry.boundingClientRect,
					entry.rootBounds,
				);
				if (left || top) list.scrollBy({ left, top, behavior });
			}
		},
		{ root: list, rootMargin: getRootMargin(list), threshold: 1 },
	);

	const observeActive = () => {
		const tab = list.querySelector(ACTIVE_TAB_SELECTOR);
		if (tab) intersectionObserver.observe(tab);
	};

	const mutationObserver = new MutationObserver(() => {
		behavior = getScrollBehavior();
		observeActive();
	});

	observeActive();
	mutationObserver.observe(list, {
		subtree: true,
		attributes: true,
		attributeFilter: ['data-state'],
	});

	return () => {
		mutationObserver.disconnect();
		intersectionObserver.disconnect();
	};
};
