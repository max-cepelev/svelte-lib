<script lang="ts">
import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
import styles from './styles.css';

let {
  ref = $bindable(null),
  class: className,
  ...restProps
}: DropdownMenuPrimitive.SubContentProps = $props();
</script>

<DropdownMenuPrimitive.SubContent
  bind:ref
  data-slot="dropdown-menu-sub-content"
  class={[styles.subContent, className]}
  {...restProps}
/>
