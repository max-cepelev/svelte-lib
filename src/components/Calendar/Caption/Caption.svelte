<script lang="ts">
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
} from '@internationalized/date';
import type { ComponentProps } from 'svelte';
import Calendar from '../Calendar.svelte';
import { MonthSelect } from '../MonthSelect';
import { YearSelect } from '../YearSelect';

let {
  captionLayout,
  months,
  monthFormat,
  years,
  yearFormat,
  month,
  locale,
  placeholder = $bindable(),
  monthIndex = 0,
}: {
  captionLayout: ComponentProps<typeof Calendar>['captionLayout'];
  months: ComponentProps<typeof MonthSelect>['months'];
  monthFormat: ComponentProps<typeof MonthSelect>['monthFormat'];
  years: ComponentProps<typeof YearSelect>['years'];
  yearFormat: ComponentProps<typeof YearSelect>['yearFormat'];
  month: DateValue;
  placeholder: DateValue | undefined;
  locale: string;
  monthIndex: number;
} = $props();

function formatYear(date: DateValue) {
  const dateObj = date.toDate(getLocalTimeZone());
  if (typeof yearFormat === 'function')
    return yearFormat(dateObj.getFullYear());
  return new DateFormatter(locale, { year: yearFormat }).format(dateObj);
}

function formatMonth(date: DateValue) {
  const dateObj = date.toDate(getLocalTimeZone());
  if (typeof monthFormat === 'function')
    return monthFormat(dateObj.getMonth() + 1);
  return new DateFormatter(locale, { month: monthFormat }).format(dateObj);
}
</script>

{#snippet monthSelect()}
  <MonthSelect
    {months}
    {monthFormat}
    value={month.month}
    onchange={(e) => {
			if (!placeholder) return;
			const v = Number.parseInt(e.currentTarget.value);
			const newPlaceholder = placeholder.set({ month: v });
			placeholder = newPlaceholder.subtract({ months: monthIndex });
		}}
  />
{/snippet}

{#snippet yearSelect()}
  <YearSelect {years} {yearFormat} value={month.year} />
{/snippet}

{#if captionLayout === "dropdown"}
  {@render monthSelect()}
  {@render yearSelect()}
{:else if captionLayout === "dropdown-months"}
  {@render monthSelect()}
  {#if placeholder}
    {formatYear(placeholder)}
  {/if}
{:else if captionLayout === "dropdown-years"}
  {#if placeholder}
    {formatMonth(placeholder)}
  {/if}
  {@render yearSelect()}
{:else}
  {formatMonth(month)}
  {formatYear(month)}
{/if}
