<script lang="ts">
import { ChevronDownIcon } from '@lucide/svelte';
import { Calendar as CalendarPrimitive } from 'bits-ui';
import type { WithoutChildrenOrChild } from '~/types';
import styles from './styles.css';

let {
  ref = $bindable(null),
  class: className,
  value,
  onchange,
  ...restProps
}: WithoutChildrenOrChild<CalendarPrimitive.MonthSelectProps> = $props();
</script>

<span class={[styles.wrapper, className]}>
  <CalendarPrimitive.MonthSelect bind:ref class={styles.select} {...restProps}>
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
      <span class={styles.visiblePart} aria-hidden="true">
        {monthItems.find((item) => item.value === value)?.label || selectedMonthItem.label}
        <ChevronDownIcon size={16} />
      </span>
    {/snippet}
  </CalendarPrimitive.MonthSelect>
</span>
