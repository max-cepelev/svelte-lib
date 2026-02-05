<script lang="ts">
import { ChevronDownIcon } from '@lucide/svelte';
import { Select as SelectPrimitive } from 'bits-ui';
import type { WithoutChildrenOrChild } from '../../../types.js';
import styles from './styles.css.js';

let {
  ref = $bindable(null),
  class: className,
  ...restProps
}: WithoutChildrenOrChild<SelectPrimitive.ScrollDownButtonProps> = $props();
</script>

<SelectPrimitive.ScrollDownButton
  bind:ref
  data-slot="select-scroll-down-button"
  class={[styles.scrollDownButton, className]}
  {...restProps}
>
  <ChevronDownIcon size={16} />
</SelectPrimitive.ScrollDownButton>
