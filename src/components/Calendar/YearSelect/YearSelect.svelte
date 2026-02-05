<script lang="ts">
import { ChevronDownIcon } from '@lucide/svelte';
import { Calendar as CalendarPrimitive } from 'bits-ui';
import type { WithoutChildrenOrChild } from '../../../types.js';
import styles from './styles.css.js';

let {
  ref = $bindable(null),
  class: className,
  value,
  ...restProps
}: WithoutChildrenOrChild<CalendarPrimitive.YearSelectProps> = $props();
</script>

<span class={[styles.wrapper, className]}>
  <CalendarPrimitive.YearSelect bind:ref class={styles.select} {...restProps}>
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
      <span class={styles.visiblePart} aria-hidden="true">
        {yearItems.find((item) => item.value === value)?.label || selectedYearItem?.label || ''}
        <ChevronDownIcon size={16} />
      </span>
    {/snippet}
  </CalendarPrimitive.YearSelect>
</span>
