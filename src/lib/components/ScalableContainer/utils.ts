export const getDistance = (touch1: Touch, touch2: Touch) => {
	const dx = touch1.clientX - touch2.clientX;
	const dy = touch1.clientY - touch2.clientY;
	return Math.sqrt(dx * dx + dy * dy);
};

export const getEventPosition = (event: MouseEvent | TouchEvent) => {
	if (event instanceof TouchEvent && event.touches.length > 0) {
		return { x: event.touches[0].clientX, y: event.touches[0].clientY };
	}
	return { x: (event as MouseEvent).clientX, y: (event as MouseEvent).clientY };
};
