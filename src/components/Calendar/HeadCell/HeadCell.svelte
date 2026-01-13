<script lang="ts">
import { Calendar as CalendarPrimitive } from 'bits-ui';
import styles from './styles.css.js';

let {
	ref = $bindable(null),
	class: className,
	...restProps
}: CalendarPrimitive.HeadCellProps = $props();
</script>

<CalendarPrimitive.HeadCell
	bind:ref
	class={[styles.headCell, className]}
	{...restProps}
/>