<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '~/styles/index.js';
import styles from './styles.css.js';

let {
	ref = $bindable(null),
	class: className,
	children,
	...restProps
}: WithElementRef<HTMLAttributes<HTMLElement>> = $props();
</script>

<nav
	{...restProps}
	bind:this={ref}
	class={[styles.nav, className]}
>
	{@render children?.()}
</nav>