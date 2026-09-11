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
  class={["separator", className]}
  {...restProps}
/>

<style>
@layer max-ts-svelte-components {
  :global(
    [data-slot="button-group-separator"].separator[data-slot="button-group-separator"].separator
  ) {
    background-color: var(--colors-border);
    position: relative;
    margin: 0;
    align-self: stretch;
  }
  :global(
    [data-slot="button-group-separator"].separator[data-orientation="vertical"]
  ) {
    height: auto;
  }
}
</style>
