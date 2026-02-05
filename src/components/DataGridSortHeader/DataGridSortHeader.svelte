<script lang="ts">
type TData = $$Generic;

import {
  ArrowDownNarrowWide,
  ArrowDownUp,
  ArrowDownWideNarrow,
} from '@lucide/svelte';
import styles from './styles.css.js';
import type { DataGridSortHeaderProps } from './types.js';

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
			styles.wrapper,
			styles.alignments[align],
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
