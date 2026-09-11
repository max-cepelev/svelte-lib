<script lang="ts">
import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';

let {
  ref = $bindable(null),
  class: className,
  ...restProps
}: DropdownMenuPrimitive.SeparatorProps = $props();
</script>

<DropdownMenuPrimitive.Separator
  bind:ref
  data-slot="dropdown-menu-separator"
  class={["separator", className]}
  {...restProps}
/>

<style>
@layer max-ts-svelte-components {
  :global([data-slot="dropdown-menu-separator"].separator) {
    background-color: var(--colors-border);
    margin-left: calc(-1 * var(--spacing-1));
    margin-right: calc(-1 * var(--spacing-1));
    margin-top: var(--spacing-1);
    margin-bottom: var(--spacing-1);
    height: 1px;
  }
}
</style>
