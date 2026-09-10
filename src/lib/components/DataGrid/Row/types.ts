import type { DataGridColumn } from '../types';

export type RowProps<TRow> = {
	row: TRow;
	columns: DataGridColumn<TRow>[];
	rowIndex: number;
	rowId: string;
	rowHeight: number;
	onRowClick?: (row: TRow) => void;
};
