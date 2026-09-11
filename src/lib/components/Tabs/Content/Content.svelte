<script lang="ts">
import { Tabs as TabsPrimitive } from 'bits-ui';
import type { TabsContentProps } from '../types';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: TabsContentProps = $props();
</script>

<TabsPrimitive.Content
  bind:ref
  data-slot="tabs-content"
  class={["content", className]}
  {...restProps}
>
  {@render children?.()}
</TabsPrimitive.Content>

<style>
@layer max-ts-svelte-components {
  :global([data-slot="tabs-content"].content) {
    flex: 1;
    outline: none;
  }
}
</style>
