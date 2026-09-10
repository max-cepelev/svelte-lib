<script lang="ts">
import type { ComponentProps } from 'svelte';
import { Label } from '../../Label';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: ComponentProps<typeof Label> = $props();
</script>

<Label
  bind:ref
  data-slot="field-label"
  class={["root", className]}
  {...restProps}
>
  {@render children?.()}
</Label>

<style>
:global([data-slot="field-label"].root) {
  display: flex;
  width: fit-content;
  align-items: center;
  gap: var(--spacing-2);
  line-height: var(--lineHeight-snug);
  font-size: var(--fontSize-sm);
  cursor: pointer;
}
:global([data-slot="field"][data-disabled="true"])
  :global([data-slot="field-label"].root) {
  opacity: 0.5;
}
:global([data-slot="field-label"].root:has(> [data-slot="field"])) {
  width: 100%;
  flex-direction: column;
  border-radius: var(--radius-medium);
  border-width: 1px;
  border-style: solid;
  border-color: var(--colors-border);
}
:global(
  [data-slot="field-label"].root:has(
    > [data-slot="field"][data-state="checked"]
  )
) {
  background-color: color-mix(in oklch, var(--colors-primary) 5%, transparent);
  border-color: var(--colors-primary);
}
:global(
    [data-slot="field-label"].root:has(
      > [data-slot="field"][data-state="checked"]
    )
  )
  :global(html[data-theme="dark"])
  :global([data-slot="field-label"].root) {
  background-color: color-mix(in oklch, var(--colors-primary) 10%, transparent);
}
:global([data-slot="field-label"].root) > :global([data-slot="field"]) {
  padding: var(--spacing-4);
}
</style>
