import type { DataGridColumn } from '../types';

export type HeaderProps<TRow> = {
	columns: DataGridColumn<TRow>[];
	height: string | number;
	sticky?: boolean;
};
