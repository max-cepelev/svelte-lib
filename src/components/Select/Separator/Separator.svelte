<script lang="ts">
import type { SeparatorProps } from '~/components/Separator/index.js';
import { Separator } from './index.js';

import styles from './styles.css.js';

let {
	ref = $bindable(null),
	class: className,
	...restProps
}: SeparatorProps = $props();
</script>

<Separator
	bind:ref
	data-slot="select-separator"
	class={[styles.separator, className]}
	{...restProps}
/>