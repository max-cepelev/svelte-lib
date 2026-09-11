<script lang="ts">
import { Calendar as CalendarPrimitive } from 'bits-ui';

let {
  ref = $bindable(null),
  class: className,
  ...restProps
}: CalendarPrimitive.HeaderProps = $props();
</script>

<CalendarPrimitive.Header
  bind:ref
  class={["calendar-header", className]}
  {...restProps}
/>

<style>
@layer max-ts-svelte-components {
  :global(.calendar-header) {
    display: flex;
    height: var(--cell-size);
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 0.375rem;
    font-size: var(--fontSize-sm);
    font-weight: var(--fontWeight-medium);
  }
}
</style>
