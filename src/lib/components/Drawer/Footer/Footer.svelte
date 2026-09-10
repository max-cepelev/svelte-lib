<script lang="ts">
import type { DrawerFooterProps } from '../types';

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
  class={["footer", className]}
  {...restProps}
>
  {@render children?.()}
</div>

<style>
.footer {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  padding: var(--spacing-4);
}
</style>
