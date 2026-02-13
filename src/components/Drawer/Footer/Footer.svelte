<script lang="ts">
import type { DrawerFooterProps } from '../types';
import styles from '../styles.css';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: DrawerFooterProps = $props();
</script>

<div
  bind:this={ref}
  data-slot="drawer-footer"
  class={[styles.footer, className]}
  {...restProps}
>
  {@render children?.()}
</div>
