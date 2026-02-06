<script lang="ts">
type TRow = $$Generic;

import { Cell } from '../Cell';
import styles from './styles.css';
import type { RowProps } from './types';

let { row, columns, rowIndex, rowId, rowHeight, onRowClick }: RowProps<TRow> =
  $props();

const handleSelect = () => {
  if (onRowClick) {
    onRowClick(row);
  }
};
</script>

<tr
  onclick={handleSelect}
  onkeydown={handleSelect}
  class={[styles.row, { [styles.selectable]: !!onRowClick }]}
>
  {#each columns as column, index (`${rowId}-${index}`)}
    <Cell {row} {rowIndex} {column} height={rowHeight} />
  {/each}
</tr>
