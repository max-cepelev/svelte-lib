<script lang="ts">
import { ChevronUpIcon } from '@lucide/svelte';
import { Select as SelectPrimitive } from 'bits-ui';
import type { WithoutChildrenOrChild } from '../../../types.js';
import styles from './styles.css.js';

let {
  ref = $bindable(null),
  class: className,
  ...restProps
}: WithoutChildrenOrChild<SelectPrimitive.ScrollUpButtonProps> = $props();
</script>

<SelectPrimitive.ScrollUpButton
  bind:ref
  data-slot="select-scroll-up-button"
  class={[styles.scrollUpButton, className]}
  {...restProps}
>
  <ChevronUpIcon class={styles.icon} />
</SelectPrimitive.ScrollUpButton>
