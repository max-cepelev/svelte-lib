export const formatNumber = (num: number): string => {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const parseFormattedNumber = (str: string): number => {
	const normalized = str.replace(/[\s\u00a0]/g, '').replace(',', '.');

	if (normalized === '') return Number.NaN;

	const value = Number(normalized);
	return Number.isFinite(value) ? value : Number.NaN;
};
