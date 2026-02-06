<script lang="ts">
type TRow = $$Generic;

import { Row } from '../Row';
import { State } from '../State';
import styles from './styles.css';
import type { BodyProps } from './types';

let {
  isError,
  isLoading,
  emptyState,
  errorState,
  columns,
  rows,
  rowHeight,
  keyId,
  onRowClick,
  onRetry,
}: BodyProps<TRow> = $props();

const isEmpty = $derived(rows.length === 0);
const isStateVisible = $derived(isError || isLoading || isEmpty);
</script>

{#if isStateVisible}
  <tbody class={styles.container}>
    <State
      {emptyState}
      {errorState}
      {isEmpty}
      {isError}
      {isLoading}
      columnsLength={columns.length}
      {onRetry}
    />
  </tbody>
{:else}
  <tbody class={styles.container}>
    {#each rows as row, index (`${row[keyId]}`)}
      {@const rowId = String(row[keyId])}
      <Row {row} {rowId} {rowHeight} {columns} {onRowClick} rowIndex={index} />
    {/each}
  </tbody>
{/if}
