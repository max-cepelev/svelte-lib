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

export const getSliderSteps = (
	min: number,
	max: number,
	step: number,
): number[] => {
	if (max <= min) return [min];

	const normalizedStep = Number.isFinite(step) && step > 0 ? step : 1;
	const precision = Math.max(
		getDecimalPlaces(normalizedStep),
		getDecimalPlaces(min),
		getDecimalPlaces(max),
	);
	const stepCount = Math.floor((max - min) / normalizedStep);
	const steps = Array.from({ length: stepCount + 1 }, (_, index) =>
		roundToPrecision(min + index * normalizedStep, precision),
	);

	if (steps.at(-1) !== max) {
		steps.push(max);
	}

	return steps;
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
	step: number | readonly number[],
): number => {
	const clampedValue = Math.min(max, Math.max(min, value));
	const steps =
		typeof step === 'number' ? getSliderSteps(min, max, step) : step;

	return steps.reduce((closest, current) =>
		Math.abs(current - clampedValue) < Math.abs(closest - clampedValue)
			? current
			: closest,
	);
};
