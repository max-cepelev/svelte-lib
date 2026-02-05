<script lang="ts">
import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
import styles from './styles.css.js';

let {
  ref = $bindable(null),
  class: className,
  inset,
  variant = 'default',
  ...restProps
}: DropdownMenuPrimitive.ItemProps & {
  inset?: boolean;
  variant?: 'default' | 'destructive';
} = $props();
</script>

<DropdownMenuPrimitive.Item
  bind:ref
  data-slot="dropdown-menu-item"
  data-inset={inset}
  data-variant={variant}
  class={[styles.root, className]}
  {...restProps}
/>
