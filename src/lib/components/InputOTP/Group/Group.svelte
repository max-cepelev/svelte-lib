<script lang="ts">
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
  class={["group", className]}
  {...restProps}
>
  {@render children?.()}
</div>

<style>
.group {
  display: flex;
  align-items: center;
}
</style>
