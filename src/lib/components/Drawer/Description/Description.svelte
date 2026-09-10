<script lang="ts">
import { Dialog as DialogPrimitive } from 'bits-ui';
import type { DrawerDescriptionProps } from '../types';

const { class: className, ...restProps }: DrawerDescriptionProps = $props();
</script>

<DialogPrimitive.Description
  data-slot="drawer-description"
  class={["description", className]}
  {...restProps}
/>

<style>
:global([data-slot="drawer-description"].description) {
  font-size: var(--fontSize-sm);
  color: var(--colors-text-secondary);
}
</style>
