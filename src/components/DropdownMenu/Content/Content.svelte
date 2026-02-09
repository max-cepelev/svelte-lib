<script lang="ts">
import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
import type { ComponentProps } from 'svelte';
import type { WithoutChildrenOrChild } from '../../../types.ts';
import { Portal } from '../Portal';
import styles from './styles.css';

let {
  ref = $bindable(null),
  sideOffset = 4,
  portalProps,
  class: className,
  ...restProps
}: DropdownMenuPrimitive.ContentProps & {
  portalProps?: WithoutChildrenOrChild<ComponentProps<typeof Portal>>;
} = $props();
</script>

<Portal {...portalProps}>
  <DropdownMenuPrimitive.Content
    bind:ref
    data-slot="dropdown-menu-content"
    {sideOffset}
    class={[styles.content, className]}
    {...restProps}
  />
</Portal>
