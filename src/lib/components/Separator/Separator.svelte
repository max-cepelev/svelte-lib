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
  class={className}
  {...restProps}
/>

<style>
@layer max-ts-svelte-components {
  :global {
    [data-slot="separator"] {
      background-color: var(--colors-border);
      flex-shrink: 0;
      &[data-orientation="horizontal"] {
        height: 1px;
        width: 100%;
      }
      &[data-orientation="vertical"] {
        height: 100%;
        width: 1px;
      }
    }
  }
}
</style>
