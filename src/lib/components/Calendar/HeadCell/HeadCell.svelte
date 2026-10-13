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
  data-slot="calendar-head-cell"
  class={className}
  {...restProps}
/>

<style>
@layer max-ts-svelte-components {
  :global {
    [data-slot="calendar-head-cell"] {
      color: var(--colors-text-secondary);
      width: var(--cell-size);
      border-radius: var(--radius-medium);
      font-size: var(--fontSize-xs);
      font-weight: var(--fontWeight-normal);
    }
  }
}
</style>
