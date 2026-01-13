import type { DataGridColumn } from '../DataGrid/types.js';

export type DataGridSorting<TData> = {
	key: keyof TData;
	order: 'asc' | 'desc';
};

export type DataGridSortHeaderProps<TData> = {
	column: DataGridColumn<TData>;
	sorting: DataGridSorting<TData>;
	setSorting: (sorting: DataGridSorting<TData>) => void;
	class?: string;
};
