<script lang="ts">
type TData = $$Generic;

import {
  ArrowDownNarrowWide,
  ArrowDownUp,
  ArrowDownWideNarrow,
} from '@lucide/svelte';

import type { DataGridSortHeaderProps } from './types';

let {
  sorting,
  setSorting,
  column,
  class: className,
}: DataGridSortHeaderProps<TData> = $props();

const { title, field, align = 'left' } = $derived(column);

const handleClick = () => {
  if (!field) return;

  if (sorting.key === field) {
    setSorting({
      key: field,
      order: sorting.order === 'asc' ? 'desc' : 'asc',
    });
  } else {
    setSorting({
      key: field,
      order: 'asc',
    });
  }
};
</script>

{#if field}
  <button
    type="button"
    onclick={handleClick}
    class={[
			"wrapper",
			`align-${align}`,
			className,
		]}
  >
    {title}
    {#if sorting.key === field}
      {#if sorting.order === 'asc'}
        <ArrowDownNarrowWide size={16} />
      {:else}
        <ArrowDownWideNarrow size={16} />
      {/if}
    {:else}
      <ArrowDownUp size={16} />
    {/if}
  </button>
{/if}

<style>
.wrapper {
  display: flex;
  position: relative;
  align-items: center;
  gap: var(--spacing-1);
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
  font-family: inherit;
  width: 100%;
  height: 100%;
  overflow-wrap: break-word;
}
.wrapper :global(svg) {
  min-width: 12px;
  stroke: currentColor;
}
.align-left {
  justify-content: flex-start;
}
.align-center {
  justify-content: center;
}
.align-right {
  justify-content: flex-end;
}
.align-justify {
  justify-content: space-between;
}
</style>
