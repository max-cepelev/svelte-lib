<script lang="ts">
import { CheckIcon, MinusIcon } from '@lucide/svelte';
import { Checkbox as CheckboxPrimitive } from 'bits-ui';
import type { WithoutChildrenOrChild } from '../../types.ts';

let {
  ref = $bindable(null),
  checked = $bindable(false),
  indeterminate = $bindable(false),
  class: className,
  ...restProps
}: WithoutChildrenOrChild<CheckboxPrimitive.RootProps> = $props();
</script>

<CheckboxPrimitive.Root
  bind:ref
  data-slot="checkbox"
  class={["checkbox", className]}
  bind:checked
  bind:indeterminate
  {...restProps}
>
  {#snippet children({ checked, indeterminate })}
    {#if checked}
      <CheckIcon data-slot="checkbox-indicator" class="indicator" size={16} />
    {:else if indeterminate}
      <MinusIcon data-slot="checkbox-indicator" class="indicator" size={16} />
    {/if}
  {/snippet}
</CheckboxPrimitive.Root>

<style>
:global([data-slot="checkbox"]) {
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--spacing-4);
  height: var(--spacing-4);
  flex-shrink: 0;
  border-radius: var(--spacing-1);
  border: 1px solid var(--colors-border);
  background-color: transparent;
  transition:
    background-color 200ms,
    border-color 200ms;
  cursor: pointer;
  outline: none;
  color: var(--colors-foreground-primary);

  &:focus-visible {
    outline: none;
    border-color: var(--colors-primary);
  }

  &:hover {
    border-color: var(--colors-primary);
    box-shadow: var(--shadow-2);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &[data-state="checked"] {
    background-color: var(--colors-primary);
    border-color: var(--colors-primary);
  }
  &[aria-invalid="true"] {
    border-color: var(--colors-error);
  }
}

:global([data-slot="checkbox-indicator"]) {
  color: currentColor;
}

@keyframes checked {
  0% {
    scale: 0;
  }
  60% {
    scale: 1.15;
  }
  100% {
    scale: 1;
  }
}
@keyframes unchecked {
  from {
    scale: 1;
  }
  to {
    scale: 0;
  }
}
</style>
