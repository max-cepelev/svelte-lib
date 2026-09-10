<script lang="ts">
type TRow = $$Generic;

import type { HeaderCellProps } from './types';

let { column, height, width }: HeaderCellProps<TRow> = $props();

const alignment = $derived(column.align ?? 'left');
const hightValue = $derived(
  typeof height === 'number' ? `${height}px` : height,
);
const widthValue = $derived(typeof width === 'number' ? `${width}px` : width);
</script>

<th
  title={column.title}
  class="cell"
  align={alignment}
  style:color={column.color}
  style:height={hightValue}
  style:width={widthValue}
>
  {#if column.headerCell}
    {@render column.headerCell(column)}
  {:else}
    {column.title}
  {/if}
</th>

<style>
.cell {
  padding: var(--spacing-1) var(--spacing-2);
  width: 100%;
  font-weight: var(--fontWeight-semibold);
  font-size: var(--fontSize-sm);
  overflow-wrap: break-word;
  background-color: var(--colors-background-paper);
  border-bottom: 1px solid var(--colors-border);
}
</style>
