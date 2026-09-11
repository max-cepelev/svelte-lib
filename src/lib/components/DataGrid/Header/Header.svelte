<script lang="ts">
import { HeaderCell } from '../HeaderCell';

import type { HeaderProps } from './types';

type TRow = $$Generic;

let { columns, height, sticky }: HeaderProps<TRow> = $props();
</script>

<thead>
  <tr
    class={{
		'sticky': sticky
	}}
  >
    {#each columns as column (column.title)}
      <HeaderCell {column} {height} width={column.width} />
    {/each}
  </tr>
</thead>

<style>
@layer max-ts-svelte-components {
  .sticky {
    position: sticky;
    top: 0;
    z-index: 1;
  }
}
</style>
