import type { DataGridColumn } from '../types.js';

export type HeaderProps<TRow> = {
	columns: DataGridColumn<TRow>[];
	height: string | number;
	sticky?: boolean;
};
