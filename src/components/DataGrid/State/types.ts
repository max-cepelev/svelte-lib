import type { DataGridState } from '../types';

export type StateProps = {
	isLoading?: boolean;
	isEmpty?: boolean;
	isError?: boolean;
	columnsLength: number;
	emptyState?: DataGridState;
	errorState?: DataGridState;
	onRetry?: () => void;
};
