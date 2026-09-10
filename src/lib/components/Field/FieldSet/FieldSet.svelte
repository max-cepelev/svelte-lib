<script lang="ts">
import type { HTMLFieldsetAttributes } from 'svelte/elements';
import type { WithElementRef } from '../../../types.ts';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: WithElementRef<HTMLFieldsetAttributes> = $props();
</script>

<fieldset
  bind:this={ref}
  data-slot="field-set"
  class={["root", className]}
  {...restProps}
>
  {@render children?.()}
</fieldset>

<style>
.root {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
  border: none;
  padding: 0;
}
.root:has(> :global([data-slot="checkbox-group"])),
.root:has(> :global([data-slot="radio-group"])) {
  gap: var(--spacing-3);
}
</style>
