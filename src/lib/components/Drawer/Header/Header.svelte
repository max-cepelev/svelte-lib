<script lang="ts">
import type { DrawerHeaderProps } from '../types';

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
  class={["header", className]}
  {...restProps}
>
  {@render children?.()}
</div>

<style>
.header {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  padding: var(--spacing-4);
}
@media (max-width: 48rem) {
  .header {
    padding: var(--spacing-3);
  }
}
</style>
