<script lang="ts">
import { PinInput as InputOTPPrimitive } from 'bits-ui';
import styles from './styles.css';
import type { InputOTPProps } from './types';

let {
  ref = $bindable(null),
  value = $bindable(''),
  class: className,
  'data-slot': dataSlot = 'input-otp',
  ...restProps
}: InputOTPProps = $props();
</script>

<InputOTPPrimitive.Root
  bind:ref
  bind:value
  data-slot={dataSlot}
  class={[styles.root, className]}
  {...restProps}
/>
