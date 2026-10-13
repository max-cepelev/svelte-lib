<script lang="ts">
import { Tabs as TabsPrimitive } from 'bits-ui';

import type { TabsProps } from './types';

let {
  ref = $bindable(null),
  value = $bindable(''),
  orientation = 'horizontal',
  class: className,
  children,
  ...restProps
}: TabsProps = $props();
</script>

<TabsPrimitive.Root
  bind:ref
  bind:value
  data-slot="tabs"
  {orientation}
  class={className}
  {...restProps}
>
  {@render children?.()}
</TabsPrimitive.Root>

<style>
@layer max-ts-svelte-components {
  :global {
    [data-slot="tabs"] {
      display: flex;
      gap: var(--spacing-2);
      &[data-orientation="horizontal"] {
        flex-direction: column;
      }
      &[data-orientation="vertical"] {
        flex-direction: row;
        align-items: flex-start;
      }
    }
  }
}
</style>
