const getDecimalPlaces = (value: number): number => {
	if (Number.isInteger(value)) return 0;

	const stringValue = value.toString();
	if (stringValue.includes('e-')) {
		return Number.parseInt(stringValue.split('e-')[1] ?? '0', 10);
	}

	return stringValue.split('.')[1]?.length ?? 0;
};

const roundToPrecision = (value: number, precision: number): number => {
	const factor = 10 ** precision;
	return Math.round(value * factor) / factor;
};

export const getSliderStep = (
	min: number,
	max: number,
	step: number,
	maxSteps = 1000,
): number => {
	const requestedStep = Number.isFinite(step) && step > 0 ? step : 1;
	const stepCount = Math.abs(max - min) / requestedStep;

	if (stepCount <= maxSteps) return requestedStep;

	return roundToPrecision(
		requestedStep * Math.ceil(stepCount / maxSteps),
		getDecimalPlaces(requestedStep),
	);
};

export const snapSliderValue = (
	value: number,
	min: number,
	max: number,
	step: number,
): number => {
	const clampedValue = Math.min(max, Math.max(min, value));
	const stepIndex = (clampedValue - min) / step;
	const lowerValue = min + Math.floor(stepIndex) * step;
	const upperValue = min + Math.ceil(stepIndex) * step;
	const snappedValue =
		upperValue <= max &&
		Math.abs(upperValue - clampedValue) < Math.abs(clampedValue - lowerValue)
			? upperValue
			: lowerValue;
	const precision = Math.max(getDecimalPlaces(step), getDecimalPlaces(min));

	return roundToPrecision(snappedValue, precision);
};
