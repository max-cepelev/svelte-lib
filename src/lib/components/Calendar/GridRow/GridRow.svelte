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
  class={["calendar-grid-row", className]}
  {...restProps}
/>

<style>
@layer max-ts-svelte-components {
  :global(.calendar-grid-row) {
    display: flex;
    column-gap: var(--spacing-1);
  }
}
</style>
