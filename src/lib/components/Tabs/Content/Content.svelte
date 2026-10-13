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
  class={className}
  {...restProps}
>
  {@render children?.()}
</TabsPrimitive.Content>

<style>
@layer max-ts-svelte-components {
  :global {
    [data-slot="tabs-content"] {
      flex: 1;
      color: var(--colors-text-primary);
      font-size: var(--fontSize-sm);
      outline: none;
    }
  }
}
</style>
