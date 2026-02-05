<script lang="ts">
import type { EmptyMediaProps } from '../types.js';
import styles from '../styles.css.js';

let {
  ref = $bindable(null),
  class: className,
  children,
  variant = 'default',
  ...restProps
}: EmptyMediaProps = $props();
</script>

<div
  bind:this={ref}
  data-slot="empty-icon"
  data-variant={variant}
  class={[styles.media, styles.mediaVariants[variant], className]}
  {...restProps}
>
  {@render children?.()}
</div>
