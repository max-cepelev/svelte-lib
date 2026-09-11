<script lang="ts">
type TRow = $$Generic;

import { Cell } from '../Cell';

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
  class={["row", { 'selectable': !!onRowClick }]}
>
  {#each columns as column, index (`${rowId}-${index}`)}
    <Cell {row} {rowIndex} {column} height={rowHeight} />
  {/each}
</tr>

<style>
@layer max-ts-svelte-components {
  .row {
    background-color: transparent;
    transition: background-color 0.2s ease;
  }
  .row:last-child :global(td) {
    border-bottom: none;
  }
  .selectable {
    cursor: pointer;
  }
  .selectable:hover {
    background-color: var(--colors-background-elementHover);
  }
}
</style>
