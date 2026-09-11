<script lang="ts">
import { ChevronDownIcon } from '@lucide/svelte';
import { Calendar as CalendarPrimitive } from 'bits-ui';
import type { WithoutChildrenOrChild } from '../../../types.ts';

let {
  ref = $bindable(null),
  class: className,
  value,
  onchange,
  ...restProps
}: WithoutChildrenOrChild<CalendarPrimitive.MonthSelectProps> = $props();
</script>

<span class={["wrapper", className]}>
  <CalendarPrimitive.MonthSelect
    bind:ref
    class="calendar-month-select"
    {...restProps}
  >
    {#snippet child({ props, monthItems, selectedMonthItem })}
      <select {...props} {value} {onchange}>
        {#each monthItems as monthItem (monthItem.value)}
          <option
            value={monthItem.value}
            selected={value !== undefined
              ? monthItem.value === value
              : monthItem.value === selectedMonthItem.value}
          >
            {monthItem.label}
          </option>
        {/each}
      </select>
      <span class="visible-part" aria-hidden="true">
        {monthItems.find((item) => item.value === value)?.label ||
          selectedMonthItem.label}
        <ChevronDownIcon size={16} />
      </span>
    {/snippet}
  </CalendarPrimitive.MonthSelect>
</span>

<style>
@layer max-ts-svelte-components {
  .wrapper {
    position: relative;
    display: flex;
    border-radius: var(--radius-medium);
    border: 1px solid var(--colors-border);
    box-shadow: var(--shadow-1);
  }
  .wrapper:has(:global(:focus-visible)) {
    box-shadow: var(--shadow-3);
  }
  :global(.calendar-month-select) {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
  }
  .visible-part {
    display: flex;
    height: var(--spacing-8);
    align-items: center;
    gap: var(--spacing-1);
    border-radius: var(--radius-medium);
    padding-left: var(--spacing-2);
    padding-right: var(--spacing-1);
    font-size: var(--fontSize-sm);
    font-weight: var(--fontWeight-medium);
    user-select: none;
  }
  .visible-part > :global(svg) {
    color: var(--colors-text-secondary);
    width: 0.875rem;
    height: 0.875rem;
  }
}
</style>
