<script lang="ts">
import { Calendar as CalendarPrimitive } from 'bits-ui';
import styles from './styles.css.js';

let {
  ref = $bindable(null),
  class: className,
  ...restProps
}: CalendarPrimitive.CellProps = $props();
</script>

<CalendarPrimitive.Cell
  bind:ref
  class={[styles.cell, className]}
  {...restProps}
/>
