<script lang="ts">
import { Dialog as DialogPrimitive } from 'bits-ui';
import type { DrawerTitleProps } from '../types';

const { class: className, ...restProps }: DrawerTitleProps = $props();
</script>

<DialogPrimitive.Title
  data-slot="drawer-title"
  class={["title", className]}
  {...restProps}
/>

<style>
:global([data-slot="drawer-title"].title) {
  font-size: var(--fontSize-lg);
  font-weight: var(--fontWeight-semibold);
  color: var(--colors-text-primary);
}
</style>
