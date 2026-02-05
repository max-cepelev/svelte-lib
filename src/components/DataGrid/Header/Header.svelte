<script lang="ts">
import { HeaderCell } from '../HeaderCell/index.js';
import styles from './styles.css.js';
import type { HeaderProps } from './types.js';

type TRow = $$Generic;

let { columns, height, sticky }: HeaderProps<TRow> = $props();
</script>

<thead>
  <tr
    class={{
		[styles.sticky]: sticky
	}}
  >
    {#each columns as column (column.title)}
      <HeaderCell {column} {height} width={column.width} />
    {/each}
  </tr>
</thead>
