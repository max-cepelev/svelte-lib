<script lang="ts">
import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
import type { ComponentProps } from 'svelte';
import styles from './styles.css.js';

let {
  ref = $bindable(null),
  class: className,
  inset,
  ...restProps
}: ComponentProps<typeof DropdownMenuPrimitive.GroupHeading> & {
  inset?: boolean;
} = $props();
</script>

<DropdownMenuPrimitive.GroupHeading
  bind:ref
  data-slot="dropdown-menu-group-heading"
  data-inset={inset}
  class={[styles.root, className]}
  {...restProps}
/>
