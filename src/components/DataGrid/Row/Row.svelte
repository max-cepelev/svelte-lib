<script lang="ts">
type TRow = $$Generic;

import { Cell } from '../Cell/index.js';
import styles from './styles.css.js';
import type { RowProps } from './types.js';

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
