<script lang="ts">
import { type SeparatorProps, Separator } from '../../Separator';

let {
  ref = $bindable(null),
  class: className,
  ...restProps
}: SeparatorProps = $props();
</script>

<Separator
  bind:ref
  data-slot="select-separator"
  class={["separator", className]}
  {...restProps}
/>

<style>
@layer max-ts-svelte-components {
  :global([data-slot="select-separator"].separator) {
    background-color: var(--colors-border);
    pointer-events: none;
    margin-left: calc(-1 * var(--spacing-1));
    margin-right: calc(-1 * var(--spacing-1));
    margin-top: var(--spacing-1);
    margin-bottom: var(--spacing-1);
    height: 1px;
  }
}
</style>
