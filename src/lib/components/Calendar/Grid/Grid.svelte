<script lang="ts">
import { Calendar as CalendarPrimitive } from 'bits-ui';

let {
  ref = $bindable(null),
  class: className,
  ...restProps
}: CalendarPrimitive.GridProps = $props();
</script>

<CalendarPrimitive.Grid
  bind:ref
  class={["calendar-grid", className]}
  {...restProps}
/>

<style>
@layer max-ts-svelte-components {
  :global(.calendar-grid) {
    margin-top: var(--spacing-4);
    display: flex;
    width: 100%;
    border-collapse: collapse;
    flex-direction: column;
    gap: var(--spacing-1);
  }
}
</style>
