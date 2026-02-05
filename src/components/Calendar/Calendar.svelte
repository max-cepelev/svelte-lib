<script lang="ts">
import { isEqualMonth } from '@internationalized/date';
import { Calendar as CalendarPrimitive } from 'bits-ui';
import { Caption } from './Caption/index.js';
import { Cell } from './Cell/index.js';
import { Day } from './Day/index.js';
import { Grid } from './Grid/index.js';
import { GridBody } from './GridBody/index.js';
import { GridHead } from './GridHead/index.js';
import { GridRow } from './GridRow/index.js';
import { HeadCell } from './HeadCell/index.js';
import { Header } from './Header/index.js';
import { Month } from './Month/index.js';
import { Months } from './Months/index.js';
import { Nav } from './Nav/index.js';
import { NextButton } from './NextButton/index.js';
import { PrevButton } from './PrevButton/index.js';
import styles from './styles.css.js';
import type { CalendarProps } from './types.js';

let {
  ref = $bindable(null),
  value = $bindable(),
  placeholder = $bindable(),
  class: className,
  weekdayFormat = 'short',
  buttonVariant = 'ghost',
  captionLayout = 'label',
  locale = 'ru-RU',
  months: monthsProp,
  years,
  monthFormat: monthFormatProp,
  yearFormat = 'numeric',
  day,
  disableDaysOutsideMonth = false,
  ...restProps
}: CalendarProps = $props();

const monthFormat = $derived.by(() => {
  if (monthFormatProp) return monthFormatProp;
  if (captionLayout.startsWith('dropdown')) return 'short';
  return 'long';
});
</script>

<!--
Discriminated Unions + Destructing (required for bindable) do not
get along, so we shut typescript up by casting `value` to `never`.
-->
<CalendarPrimitive.Root
  bind:value={value as never}
  bind:ref
  bind:placeholder
  {weekdayFormat}
  {disableDaysOutsideMonth}
  class={[styles.calendar, className]}
  {locale}
  {monthFormat}
  {yearFormat}
  {...restProps}
>
  {#snippet children({ months, weekdays })}
    <Months>
      <Nav>
        <PrevButton variant={buttonVariant} />
        <NextButton variant={buttonVariant} />
      </Nav>
      {#each months as month, monthIndex (month)}
        <Month>
          <Header>
            <Caption
              {captionLayout}
              months={monthsProp}
              {monthFormat}
              {years}
              {yearFormat}
              month={month.value}
              bind:placeholder
              {locale}
              {monthIndex}
            />
          </Header>
          <Grid>
            <GridHead>
              <GridRow class={styles.gridRowHead}>
                {#each weekdays as weekday (weekday)}
                  <HeadCell>{weekday.slice(0, 2)}</HeadCell>
                {/each}
              </GridRow>
            </GridHead>
            <GridBody>
              {#each month.weeks as weekDates (weekDates)}
                <GridRow class={styles.gridRow}>
                  {#each weekDates as date (date)}
                    <Cell {date} month={month.value}>
                      {#if day}
                        {@render day({
													day: date,
													outsideMonth: !isEqualMonth(date, month.value),
												})}
                      {:else}
                        <Day />
                      {/if}
                    </Cell>
                  {/each}
                </GridRow>
              {/each}
            </GridBody>
          </Grid>
        </Month>
      {/each}
    </Months>
  {/snippet}
</CalendarPrimitive.Root>
