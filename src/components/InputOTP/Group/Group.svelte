<script lang="ts">
import styles from '../styles.css';
import type { InputOTPGroupProps } from '../types';

let {
  ref = $bindable(null),
  class: className,
  children,
  'data-slot': dataSlot = 'input-otp-group',
  ...restProps
}: InputOTPGroupProps = $props();
</script>

<div
  bind:this={ref}
  data-slot={dataSlot}
  class={[styles.group, className]}
  {...restProps}
>
  {@render children?.()}
</div>
