<script lang="ts">
import { Calendar as CalendarPrimitive } from 'bits-ui';

let {
  ref = $bindable(null),
  class: className,
  ...restProps
}: CalendarPrimitive.HeadingProps = $props();
</script>

<CalendarPrimitive.Heading
  bind:ref
  class={["calendar-heading", className]}
  {...restProps}
/>

<style>
@layer max-ts-svelte-components {
  :global(.calendar-heading) {
    padding-left: var(--cell-size);
    padding-right: var(--cell-size);
    font-size: var(--fontSize-sm);
    font-weight: var(--fontWeight-medium);
  }
}
</style>
