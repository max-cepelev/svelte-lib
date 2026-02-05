<script lang="ts">
import { Popover as PopoverPrimitive } from 'bits-ui';
import styles from '../styles.css.js';
import type { PopoverTriggerProps } from '../types.js';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: PopoverTriggerProps = $props();
</script>

<PopoverPrimitive.Trigger
  bind:ref
  data-slot="popover-trigger"
  class={[styles.trigger, className]}
  {...restProps}
>
  {@render children?.()}
</PopoverPrimitive.Trigger>
