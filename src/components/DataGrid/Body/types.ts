import type { DataGridProps } from '../types.js';

export type BodyProps<TRow> = Pick<
	DataGridProps<TRow>,
	| 'emptyState'
	| 'errorState'
	| 'isLoading'
	| 'isError'
	| 'columns'
	| 'rows'
	| 'onRowClick'
	| 'keyId'
	| 'onRetry'
> & {
	rowHeight: number;
};
