<script lang="ts">
import { calculateSize } from '~/utils';
import styles from './styles.css';
import type { CellProps } from './types';

type TRow = $$Generic;

let { row, column, rowIndex, height }: CellProps<TRow> = $props();

const hightValue = $derived(calculateSize(height));
const widthValue = $derived(calculateSize(column.width));
</script>

<td
  align={column.align ?? 'left'}
  style:background-color={column.cellColor?.(row)}
  style:height={hightValue}
  style:width={widthValue}
  class={[styles.cell,{
		[styles.disabled]: column.isDisabled
	}]}
>
  {#if column.cell}
    {@render column.cell(row, rowIndex)}
  {:else if column.format}
    {column.format(row) || '—'}
  {:else if column.field}
    {row[column.field] || '—'}
  {:else}
    —
  {/if}
</td>
