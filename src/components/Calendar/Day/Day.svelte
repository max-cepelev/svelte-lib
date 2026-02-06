<script lang="ts">
import { Calendar as CalendarPrimitive } from 'bits-ui';
import { buttonVariants } from '../../Button';
import styles from './styles.css';

let {
  ref = $bindable(null),
  class: className,
  ...restProps
}: CalendarPrimitive.DayProps = $props();
</script>

<CalendarPrimitive.Day
  bind:ref
  class={[buttonVariants.ghost, styles.day, className]}
  {...restProps}
/>
