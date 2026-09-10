import type { DataGridColumn } from '../types';

export type HeaderCellProps<T> = {
	column: DataGridColumn<T>;
	height?: string | number;
	width?: string | number;
};
