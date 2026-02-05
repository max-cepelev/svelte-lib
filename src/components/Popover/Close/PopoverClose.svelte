<script lang="ts">
import { Popover as PopoverPrimitive } from 'bits-ui';
import styles from '../styles.css.js';
import type { PopoverCloseProps } from '../types.js';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: PopoverCloseProps = $props();
</script>

<PopoverPrimitive.Close
  bind:ref
  data-slot="popover-close"
  class={[styles.close, className]}
  {...restProps}
>
  {@render children?.()}
</PopoverPrimitive.Close>
