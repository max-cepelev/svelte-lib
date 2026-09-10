<script lang="ts">
import MinusIcon from '@lucide/svelte/icons/minus';

import type { InputOTPSeparatorProps } from '../types';

let {
  ref = $bindable(null),
  class: className,
  children,
  'data-slot': dataSlot = 'input-otp-separator',
  ...restProps
}: InputOTPSeparatorProps = $props();
</script>

<div
  bind:this={ref}
  data-slot={dataSlot}
  class={["separator", className]}
  {...restProps}
>
  {#if children}
    {@render children?.()}
  {:else}
    <MinusIcon />
  {/if}
</div>

<style>
.separator {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--colors-text-secondary);
}
.separator :global(svg) {
  width: var(--spacing-4);
  height: var(--spacing-4);
}
</style>
