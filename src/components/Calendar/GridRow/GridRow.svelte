<script lang="ts">
import { Calendar as CalendarPrimitive } from 'bits-ui';
import styles from './styles.css';

let {
  ref = $bindable(null),
  class: className,
  ...restProps
}: CalendarPrimitive.GridRowProps = $props();
</script>

<CalendarPrimitive.GridRow
  bind:ref
  class={[styles.gridRow, className]}
  {...restProps}
/>
