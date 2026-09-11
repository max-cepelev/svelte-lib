<script lang="ts">
import { ChevronDownIcon } from '@lucide/svelte';
import { Calendar as CalendarPrimitive } from 'bits-ui';
import type { WithoutChildrenOrChild } from '../../../types.ts';

let {
  ref = $bindable(null),
  class: className,
  value,
  ...restProps
}: WithoutChildrenOrChild<CalendarPrimitive.YearSelectProps> = $props();
</script>

<span class={["wrapper", className]}>
  <CalendarPrimitive.YearSelect
    bind:ref
    class="calendar-year-select"
    {...restProps}
  >
    {#snippet child({ props, yearItems, selectedYearItem })}
      <select {...props} {value}>
        {#each yearItems as yearItem (yearItem.value)}
          <option
            value={yearItem.value}
            selected={value !== undefined
              ? yearItem.value === value
              : yearItem.value === selectedYearItem.value}
          >
            {yearItem.label}
          </option>
        {/each}
      </select>
      <span class="visible-part" aria-hidden="true">
        {yearItems.find((item) => item.value === value)?.label ||
          selectedYearItem?.label ||
          ''}
        <ChevronDownIcon size={16} />
      </span>
    {/snippet}
  </CalendarPrimitive.YearSelect>
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
  :global(.calendar-year-select) {
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
