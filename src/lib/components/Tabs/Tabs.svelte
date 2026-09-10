<script lang="ts">
import { Tabs as TabsPrimitive } from 'bits-ui';

import type { TabsProps } from './types';

let {
  ref = $bindable(null),
  value = $bindable(''),
  class: className,
  children,
  ...restProps
}: TabsProps = $props();
</script>

<TabsPrimitive.Root
  bind:ref
  bind:value
  data-slot="tabs"
  class={["root", className]}
  {...restProps}
>
  {@render children?.()}
</TabsPrimitive.Root>

<style>
:global([data-slot="tabs"].root) {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}
</style>
