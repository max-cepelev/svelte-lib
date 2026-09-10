export const formatNumber = (num: number): string => {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const parseFormattedNumber = (str: string): number => {
	const normalized = str.replace(/[\s\u00a0]/g, '').replace(',', '.');

	if (normalized === '') return Number.NaN;

	const value = Number(normalized);
	return Number.isFinite(value) ? value : Number.NaN;
};

export const clamp = (value: number, min: number, max: number): number =>
	Math.min(max, Math.max(min, value));

export const normalizeRangeValue = (
	value: readonly number[] | undefined,
	min: number,
	max: number,
): [number, number] => {
	const first = Number.isFinite(value?.[0]) ? (value?.[0] as number) : min;
	const second = Number.isFinite(value?.[1]) ? (value?.[1] as number) : max;
	const lower = clamp(Math.min(first, second), min, max);
	const upper = clamp(Math.max(first, second), min, max);

	return [lower, upper];
};
