<script lang="ts">
type TRow = $$Generic;

import styles from './styles.css.js';
import type { HeaderCellProps } from './types.js';

let { column, height, width }: HeaderCellProps<TRow> = $props();

const alignment = $derived(column.align ?? 'left');
const hightValue = $derived(
	typeof height === 'number' ? `${height}px` : height,
);
const widthValue = $derived(typeof width === 'number' ? `${width}px` : width);
</script>

<th
	title={column.title}
	class={styles.cell}
	align={alignment}
	style:color={column.color}
	style:height={hightValue}
	style:width={widthValue}>
	{#if column.headerCell}
		{@render column.headerCell(column)}
	{:else}
		{column.title}
	{/if}
</th>