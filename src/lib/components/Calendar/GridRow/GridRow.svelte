<script lang="ts">
import { Calendar as CalendarPrimitive } from 'bits-ui';

let {
  ref = $bindable(null),
  class: className,
  ...restProps
}: CalendarPrimitive.GridRowProps = $props();
</script>

<CalendarPrimitive.GridRow
  bind:ref
  data-slot="calendar-grid-row"
  class={className}
  {...restProps}
/>

<style>
@layer max-ts-svelte-components {
  :global {
    [data-slot="calendar-grid-row"] {
      display: flex;
      column-gap: var(--spacing-1);
    }
  }
}
</style>
