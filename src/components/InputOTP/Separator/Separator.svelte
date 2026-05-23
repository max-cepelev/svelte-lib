<script lang="ts">
import MinusIcon from '@lucide/svelte/icons/minus';
import styles from '../styles.css';
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
  class={[styles.separator, className]}
  {...restProps}
>
  {#if children}
    {@render children?.()}
  {:else}
    <MinusIcon />
  {/if}
</div>
