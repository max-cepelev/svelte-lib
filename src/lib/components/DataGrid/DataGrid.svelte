<script lang="ts">
import { Body } from './Body';
import { ROW_HEIGHT } from './constants';
import { Footer } from './Footer';
import { Header } from './Header';

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
  class={["container", className]}
>
  <table
    class={[
		"table",
		{
			'disabled': isDisabled,
			'loading': isLoading,
			'full-height': isFullHeight,
		},
		className
	]}
  >
    {#if title}
      <caption class="title">
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

<style>
@layer max-ts-svelte-components {
  .container {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: var(--colors-background-paper);
    width: 100%;
    height: 100%;
    overflow: hidden auto;
    border: 1px solid var(--colors-border);
    border-radius: var(--radius-medium);
  }
  .table {
    width: 100%;
    table-layout: fixed;
    border-collapse: separate;
    border-spacing: 0;
  }
  .full-height {
    height: 100%;
  }
  .disabled {
    pointer-events: none;
    background: var(--colors-background-paper);
    mix-blend-mode: luminosity;
  }
  .loading {
    pointer-events: none;
    opacity: 0.5;
  }
  .title {
    font-size: var(--fontSize-2xl);
    font-weight: var(--fontWeight-semibold);
    line-height: var(--lineHeight-none);
    letter-spacing: -0.025em;
  }
}
</style>
