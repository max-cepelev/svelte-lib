<script lang="ts">
import { Separator as SeparatorPrimitive } from 'bits-ui';

import type { SeparatorProps } from './types';

let {
  ref = $bindable(null),
  class: className,
  'data-slot': dataSlot = 'separator',
  ...restProps
}: SeparatorProps = $props();
</script>

<SeparatorPrimitive.Root
  bind:ref
  data-slot={dataSlot}
  class={["separator", className]}
  {...restProps}
/>

<style>
:global(.separator) {
  /*background-color: var(--colors-border);*/
  flex-shrink: 0;
}
:global(.separator[data-orientation="horizontal"]) {
  height: 1px;
  width: 100%;
}
:global(.separator[data-orientation="vertical"]) {
  height: 100%;
  width: 1px;
}
</style>
