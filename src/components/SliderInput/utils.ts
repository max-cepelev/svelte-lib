// Форматирование числа с пробелами (1000000 -> 1 000 000)
export const formatNumber = (num: number): string => {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

// Парсинг числа из строки с пробелами
export const parseFormattedNumber = (str: string): number => {
	return parseFloat(str.replace(/\s/g, ''));
};
