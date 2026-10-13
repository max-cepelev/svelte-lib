<script lang="ts">
import { Calendar as CalendarPrimitive } from 'bits-ui';

let {
  ref = $bindable(null),
  class: className,
  ...restProps
}: CalendarPrimitive.CellProps = $props();
</script>

<CalendarPrimitive.Cell
  bind:ref
  data-slot="calendar-cell"
  class={className}
  {...restProps}
/>

<style>
@layer max-ts-svelte-components {
  :global {
    [data-slot="calendar-cell"] {
      position: relative;
      width: var(--cell-size);
      height: var(--cell-size);
      padding: 0;
      text-align: center;
      font-size: var(--fontSize-sm);
      &:focus-within {
        z-index: 20;
      }
      &:first-child[data-selected] [data-bits-day] {
        border-top-left-radius: var(--radius-medium);
        border-bottom-left-radius: var(--radius-medium);
      }
      &:last-child[data-selected] [data-bits-day] {
        border-top-right-radius: var(--radius-medium);
        border-bottom-right-radius: var(--radius-medium);
      }
    }
  }
}
</style>
