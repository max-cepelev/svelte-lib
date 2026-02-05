<script lang="ts">
import { Calendar as CalendarPrimitive } from 'bits-ui';
import styles from './styles.css.js';

let {
  ref = $bindable(null),
  class: className,
  ...restProps
}: CalendarPrimitive.GridProps = $props();
</script>

<CalendarPrimitive.Grid
  bind:ref
  class={[styles.grid, className]}
  {...restProps}
/>
