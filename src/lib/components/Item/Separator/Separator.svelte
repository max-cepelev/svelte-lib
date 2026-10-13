<script lang="ts">
import { Separator } from '../../Separator';
import type { ComponentProps } from 'svelte';

let {
  ref = $bindable(null),
  class: className,
  ...restProps
}: ComponentProps<typeof Separator> = $props();
</script>

<Separator
  bind:ref
  data-slot="item-separator"
  orientation="horizontal"
  class={className}
  {...restProps}
/>

<style>
@layer max-ts-svelte-components {
  :global {
    [data-slot="item-separator"] {
      background-color: var(--colors-border);
      flex-shrink: 0;
      height: 1px;
      width: 100%;
    }
  }
}
</style>
