<script lang="ts">
import { Calendar as CalendarPrimitive } from 'bits-ui';
import styles from './styles.css.js';

let {
	ref = $bindable(null),
	class: className,
	...restProps
}: CalendarPrimitive.HeaderProps = $props();
</script>

<CalendarPrimitive.Header
	bind:ref
	class={[styles.header, className]}
	{...restProps}
/>