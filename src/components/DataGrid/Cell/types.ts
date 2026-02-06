import type { DataGridColumn } from '../types';

export type CellProps<TRow> = {
	row: TRow;
	column: DataGridColumn<TRow>;
	rowIndex: number;
	height: number;
};
