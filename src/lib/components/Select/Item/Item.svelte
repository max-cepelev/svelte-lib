<script lang="ts">
import { CheckIcon } from '@lucide/svelte';
import { Select as SelectPrimitive } from 'bits-ui';
import type { WithoutChild } from '../../../types.ts';

let {
  ref = $bindable(null),
  class: className,
  value,
  label,
  children: childrenProp,
  ...restProps
}: WithoutChild<SelectPrimitive.ItemProps> = $props();
</script>

<SelectPrimitive.Item
  bind:ref
  {value}
  data-slot="select-item"
  class={["item", className]}
  {...restProps}
>
  {#snippet children({ selected, highlighted })}
    <span class="check-span">
      {#if selected}
        <CheckIcon size={16} />
      {/if}
    </span>
    {#if childrenProp}
      {@render childrenProp({ selected, highlighted })}
    {:else}
      {label || value}
    {/if}
  {/snippet}
</SelectPrimitive.Item>

<style>
:global([data-slot="select-item"].item) {
  position: relative;
  display: flex;
  width: 100%;
  cursor: default;
  align-items: center;
  gap: var(--spacing-2);
  border-radius: var(--radius-small);
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
  padding-left: var(--spacing-2);
  padding-right: var(--spacing-8);
  font-size: var(--fontSize-sm);
  outline: 2px solid transparent;
  outline-offset: 2px;
  user-select: none;
}
:global([data-slot="select-item"].item[data-highlighted]) {
  background-color: var(--colors-background-elementHover);
  color: var(--colors-text-primary);
}
:global([data-slot="select-item"].item[data-disabled]) {
  pointer-events: none;
  opacity: 0.5;
}
:global([data-slot="select-item"].item) :global(svg) {
  pointer-events: none;
  flex-shrink: 0;
  width: var(--spacing-4);
  height: var(--spacing-4);
}
:global([data-slot="select-item"].item) > :global(span:last-child) {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
}
.check-span {
  position: absolute;
  inset-inline-end: var(--spacing-2);
  display: flex;
  width: 0.875rem;
  height: 0.875rem;
  align-items: center;
  justify-content: center;
}
</style>
