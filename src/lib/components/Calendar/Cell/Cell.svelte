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
  class={["calendar-cell", className]}
  {...restProps}
/>

<style>
@layer max-ts-svelte-components {
  :global(.calendar-cell) {
    position: relative;
    width: var(--cell-size);
    height: var(--cell-size);
    padding: 0;
    text-align: center;
    font-size: var(--fontSize-sm);
  }
  :global(.calendar-cell:focus-within) {
    z-index: 20;
  }
  :global(.calendar-cell:first-child[data-selected]) :global([data-bits-day]) {
    border-top-left-radius: var(--radius-medium);
    border-bottom-left-radius: var(--radius-medium);
  }
  :global(.calendar-cell:last-child[data-selected]) :global([data-bits-day]) {
    border-top-right-radius: var(--radius-medium);
    border-bottom-right-radius: var(--radius-medium);
  }
}
</style>
