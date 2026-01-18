<script lang="ts">
import styles from './styles.css.js';
import type { ButtonGroupProps } from './types.js';

let {
	ref = $bindable(null),
	class: className,
	children,
	orientation = 'horizontal',
	...restProps
}: ButtonGroupProps = $props();

const classNames = $derived([
	styles.container,
	styles.orientation[orientation],
	className,
]);
</script>

<div
	bind:this={ref}
	role="group"
	data-slot="button-group"
	data-orientation={orientation}
	class={classNames}
	{...restProps}
>
	{@render children?.()}
</div>
