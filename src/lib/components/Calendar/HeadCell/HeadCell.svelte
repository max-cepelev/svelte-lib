<script lang="ts">
import { Calendar as CalendarPrimitive } from 'bits-ui';

let {
  ref = $bindable(null),
  class: className,
  ...restProps
}: CalendarPrimitive.HeadCellProps = $props();
</script>

<CalendarPrimitive.HeadCell
  bind:ref
  class={["calendar-head-cell", className]}
  {...restProps}
/>

<style>
:global(.calendar-head-cell) {
  color: var(--colors-text-secondary);
  width: var(--cell-size);
  border-radius: var(--radius-medium);
  font-size: var(--fontSize-xs);
  font-weight: var(--fontWeight-normal);
}
</style>
