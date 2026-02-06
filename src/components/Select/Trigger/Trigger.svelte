<script lang="ts">
import { ChevronDownIcon } from '@lucide/svelte';
import { Select as SelectPrimitive } from 'bits-ui';
import type { WithoutChild } from '~/types';
import styles from './styles.css';

let {
  ref = $bindable(null),
  class: className,
  children,
  size = 'default',
  ...restProps
}: WithoutChild<SelectPrimitive.TriggerProps> & {
  size?: 'sm' | 'default';
} = $props();
</script>

<SelectPrimitive.Trigger
  bind:ref
  data-slot="select-trigger"
  data-size={size}
  class={[styles.trigger, className]}
  {...restProps}
>
  {@render children?.()}
  <ChevronDownIcon class={styles.chevronIcon} />
</SelectPrimitive.Trigger>
