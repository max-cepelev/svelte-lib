<script lang="ts">
import { Body } from './Body';
import { ROW_HEIGHT } from './constants';
import { Footer } from './Footer';
import { Header } from './Header';

import styles from './styles.css';
import type { DataGridProps } from './types';

type TRow = $$Generic;

let {
  rows,
  columns,
  class: className,
  height = '100%',
  rowHeight = ROW_HEIGHT,
  headerHeight = ROW_HEIGHT,
  keyId,
  isLoading,
  isDisabled,
  isError,
  emptyState,
  errorState,
  onRowClick,
  onRetry,
  title,
  footer,
  stickyHeader,
}: DataGridProps<TRow> = $props();

const isFullHeight = $derived(isLoading || isError || rows.length === 0);

// Вычисляемые стили
const heightValue = $derived(
  typeof height === 'number' ? `${height}px` : height,
);
</script>

<div
  data-slot="data-grid"
  style:height={heightValue}
  class={[styles.container, className]}
>
  <table
    class={[
		styles.table,
		{
			[styles.disabled]: isDisabled,
			[styles.loading]: isLoading,
			[styles.fullHeight]: isFullHeight,
		},
		className
	]}
  >
    {#if title}
      <caption class={styles.title}>
        {title}
      </caption>
    {/if}

    <Header {columns} height={headerHeight} sticky={stickyHeader} />

    <Body
      {rows}
      {columns}
      {rowHeight}
      {keyId}
      {onRowClick}
      {isLoading}
      {emptyState}
      {errorState}
      {isError}
      {onRetry}
    />
  </table>
  {#if footer}
    <Footer>{footer}</Footer>
  {/if}
</div>
