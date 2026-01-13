<script lang="ts">
import { Calendar as CalendarPrimitive } from 'bits-ui';
import styles from './styles.css.js';

let {
	ref = $bindable(null),
	class: className,
	...restProps
}: CalendarPrimitive.HeadingProps = $props();
</script>

<CalendarPrimitive.Heading
	bind:ref
	class={[styles.heading, className]}
	{...restProps}
/>