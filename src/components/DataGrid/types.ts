import type { Snippet } from 'svelte';

export type DataGridColumn<TRow> = {
	title: string;
	field?: keyof TRow;
	width?: number | string;
	align?: 'left' | 'center' | 'right' | 'justify';
	isDisabled?: boolean;
	color?: string;
	headerCell?: Snippet<
		[
			Omit<
				DataGridColumn<TRow>,
				'headerCell' | 'cell' | 'format' | 'cellClassName' | 'cellColor'
			>,
		]
	>;
	cell?: Snippet<[TRow, number]>;
	format?: (row: TRow) => string | number | null | undefined;
	cellClassName?: (row: TRow) => string;
	cellColor?: (row: TRow) => string;
};

export type DataGridColumns<TRow> = DataGridColumn<TRow>[];

export type AlignVariant = 'left' | 'center' | 'right' | 'justify';

export type DataGridState = {
	text: string;
	imgSrc?: string;
	imgAlt?: string;
	actions?: Snippet;
	errorList?: string[];
	onRetry?: () => void;
};

export type DataGridProps<TRow> = {
	rows: TRow[];
	columns: DataGridColumn<TRow>[];
	class?: string;
	height?: string | number;
	rowHeight?: number;
	headerHeight?: number;
	keyId: keyof TRow;
	isLoading?: boolean;
	isDisabled?: boolean;
	isError?: boolean;
	stickyHeader?: boolean;
	emptyState?: DataGridState;
	errorState?: DataGridState;
	// onSelectRow?: (row: TRow[]) => void;
	// selectedRows?: TRow[];
	onRowClick?: (row: TRow) => void;
	onRetry?: () => void;
	title?: string;
	footer?: Snippet<[]>;
};
