<script lang="ts">
import { PinInput as InputOTPPrimitive } from 'bits-ui';
import styles from '../styles.css';
import type { InputOTPSlotProps } from '../types';

let {
  ref = $bindable(null),
  cell,
  class: className,
  'data-slot': dataSlot = 'input-otp-slot',
  ...restProps
}: InputOTPSlotProps = $props();
</script>

<InputOTPPrimitive.Cell
  {cell}
  bind:ref
  data-slot={dataSlot}
  class={[styles.slot, cell.isActive && styles.slotActive, className]}
  {...restProps}
>
  {cell.char}
  {#if cell.hasFakeCaret}
    <div class={styles.caretWrapper}>
      <div class={styles.caret}></div>
    </div>
  {/if}
</InputOTPPrimitive.Cell>
