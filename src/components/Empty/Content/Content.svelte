<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements';
import styles from '../styles.css';
import type { WithElementRef } from '~/types';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
  bind:this={ref}
  data-slot="empty-content"
  class={[styles.content, className]}
  {...restProps}
>
  {@render children?.()}
</div>
