<script lang="ts">
import { PinInput as InputOTPPrimitive } from 'bits-ui';

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
  class={["input-otp-slot", cell.isActive && "input-otp-slot-slot-active", className]}
  {...restProps}
>
  {cell.char}
  {#if cell.hasFakeCaret}
    <div class="caret-wrapper">
      <div class="caret"></div>
    </div>
  {/if}
</InputOTPPrimitive.Cell>

<style>
:global(.input-otp-slot) {
  position: relative;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--spacing-9);
  height: var(--spacing-9);
  border-color: var(--colors-border);
  border-style: solid;
  border-width: 1px 1px 1px 0;
  background-color: var(--colors-background-paper);
  color: var(--colors-text-primary);
  font-size: var(--fontSize-sm);
  line-height: var(--lineHeight-none);
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s,
    color 0.2s;
}
:global(.input-otp-slot:first-child) {
  border-inline-start-width: 1px;
  border-start-start-radius: var(--radius-medium);
  border-end-start-radius: var(--radius-medium);
}
:global(.input-otp-slot:last-child) {
  border-start-end-radius: var(--radius-medium);
  border-end-end-radius: var(--radius-medium);
}
:global(.input-otp-slot[aria-invalid="true"]) {
  border-color: var(--colors-error);
}
:global(.input-otp-slot-slot-active) {
  z-index: 1;
  border-color: var(--colors-primary);
  box-shadow: 0 0 0 3px
    color-mix(in oklch, var(--colors-primary) 20%, transparent);
}
:global(.input-otp-slot-slot-active[aria-invalid="true"]) {
  border-color: var(--colors-error);
  box-shadow: 0 0 0 3px
    color-mix(in oklch, var(--colors-error) 20%, transparent);
}
.caret-wrapper {
  pointer-events: none;
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.caret {
  width: 1px;
  height: var(--spacing-4);
  background-color: var(--colors-text-primary);
  animation: caret-blink 1s ease-in-out infinite;
}
@keyframes caret-blink {
  0%,
  70%,
  100% {
    opacity: 1;
  }
  20%,
  50% {
    opacity: 0;
  }
}
</style>
