<script lang="ts">
import type { ComponentProps } from 'svelte';
import { Separator } from '../../Separator';

let {
  ref = $bindable(null),
  class: className,
  orientation = 'vertical',
  ...restProps
}: ComponentProps<typeof Separator> = $props();
</script>

<Separator
  bind:ref
  data-slot="button-group-separator"
  {orientation}
  class={className}
  {...restProps}
/>

<style>
@layer max-ts-svelte-components {
  :global {
    [data-slot="button-group-separator"] {
      background-color: var(--colors-border);
      position: relative;
      flex-shrink: 0;
      margin: 0;
      align-self: stretch;
      &[data-orientation="horizontal"] {
        height: 1px;
        width: 100%;
      }
      &[data-orientation="vertical"] {
        height: auto;
        width: 1px;
      }
    }
  }
}
</style>
