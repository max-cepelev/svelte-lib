<script lang="ts" module>
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
import { defineMeta } from '@storybook/addon-svelte-csf';
import { Calendar } from '../components/index.js';

const { Story } = defineMeta({
  title: 'Calendar',
  component: Calendar,
  tags: ['autodocs'],
});

let value = $state(today(getLocalTimeZone()));
</script>

<Story name="Example" asChild>
  <div
    style="width: max-content;border-radius: 8px;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);"
  >
    <Calendar
      type="single"
      bind:value
      captionLayout="dropdown"
      minValue={new CalendarDate(2000, 1, 1)}
      maxValue={new CalendarDate(2030, 1, 1)}
    />
  </div>
</Story>
