<script lang="ts">
import { PinInput as InputOTPPrimitive } from 'bits-ui';

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
  class={["input-otp-root", className]}
  {...restProps}
/>

<style>
@layer max-ts-svelte-components {
  :global(.input-otp-root) {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
  }
  :global(.input-otp-root:has(input:disabled)) {
    opacity: 0.5;
  }
  :global(.input-otp-root) :global(input:disabled) {
    cursor: not-allowed;
  }
}
</style>
