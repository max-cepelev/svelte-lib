<script lang="ts">
import type { ItemMediaProps } from '../types';
import styles from '../styles.css';

let {
  ref = $bindable(null),
  class: className,
  children,
  variant = 'default',
  ...restProps
}: ItemMediaProps = $props();
</script>

<div
  bind:this={ref}
  data-slot="item-media"
  data-variant={variant}
  class={[styles.media, styles.mediaVariants[variant], className]}
  {...restProps}
>
  {@render children?.()}
</div>
