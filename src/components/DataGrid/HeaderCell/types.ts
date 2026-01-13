import type { DataGridColumn } from '../types.js';

export type HeaderCellProps<T> = {
	column: DataGridColumn<T>;
	height?: string | number;
	width?: string | number;
};
