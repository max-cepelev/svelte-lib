<script lang="ts">
import { calculateSize } from '../../../utils';

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
  class={["cell",{
		'disabled': column.isDisabled
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

<style>
@layer max-ts-svelte-components {
  .cell {
    overflow: hidden;
    padding: var(--spacing-1) var(--spacing-2);
    height: 100%;
    color: var(--colors-text-primary);
    font-size: var(--fontSize-base);
    border-bottom: 1px solid var(--colors-border);
  }
  .disabled {
    opacity: 0.5;
  }
}
</style>
