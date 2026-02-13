<script lang="ts">
import type { DrawerHeaderProps } from '../types';
import styles from '../styles.css';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: DrawerHeaderProps = $props();
</script>

<div
  bind:this={ref}
  data-slot="drawer-header"
  class={[styles.header, className]}
  {...restProps}
>
  {@render children?.()}
</div>
