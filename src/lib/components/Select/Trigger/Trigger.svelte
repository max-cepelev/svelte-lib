<script lang="ts">
import { ChevronDownIcon } from '@lucide/svelte';
import { Select as SelectPrimitive } from 'bits-ui';
import type { WithoutChild } from '../../../types.ts';
import { getSelectContext } from '../context.svelte';

type TriggerChildProps = Parameters<
  NonNullable<SelectPrimitive.TriggerProps['child']>
>[0];

let {
  ref = $bindable(null),
  class: className,
  children,
  size = 'default',
  ...restProps
}: WithoutChild<SelectPrimitive.TriggerProps> & {
  size?: 'sm' | 'default';
} = $props();

const select = getSelectContext();
</script>

{#snippet multipleTrigger({ props }: TriggerChildProps)}
  {@const { disabled, ...triggerProps } = props}
  <div
    {...triggerProps}
    aria-disabled={disabled ? 'true' : undefined}
    aria-expanded={triggerProps['aria-expanded'] === 'true'}
    role="combobox"
    tabindex={disabled ? undefined : 0}
  >
    {@render children?.()}
    <ChevronDownIcon class="select-trigger-chevron-icon" />
  </div>
{/snippet}

<SelectPrimitive.Trigger
  bind:ref
  child={select.type === 'multiple' ? multipleTrigger : undefined}
  data-slot="select-trigger"
  data-size={size}
  class={['trigger', className]}
  {...restProps}
>
  {@render children?.()}
  <ChevronDownIcon class="select-trigger-chevron-icon" />
</SelectPrimitive.Trigger>

<style>
:global([data-slot="select-trigger"].trigger) {
  display: flex;
  width: fit-content;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-2);
  border-radius: var(--radius-medium);
  border: 1px solid var(--colors-border);
  background-color: transparent;
  padding-left: var(--spacing-3);
  padding-right: var(--spacing-3);
  padding-top: var(--spacing-2);
  padding-bottom: var(--spacing-2);
  font-size: var(--fontSize-sm);
  white-space: nowrap;
  box-shadow: var(--shadow-1);
  transition-property: color, box-shadow;
  outline: 2px solid transparent;
  outline-offset: 2px;
  user-select: none;
}
:global([data-slot="select-trigger"].trigger[data-placeholder]) {
  color: var(--colors-text-secondary);
}
:global([data-slot="select-trigger"].trigger:focus-visible) {
  border-color: var(--colors-info);
  box-shadow: 0 0 0 3px var(--colors-info);
}
:global([data-slot="select-trigger"].trigger[aria-invalid="true"]) {
  box-shadow: 0 0 0 3px rgba(var(--colors-error), 0.2);
  border-color: var(--colors-error);
}
:global([data-slot="select-trigger"].trigger[data-disabled]) {
  cursor: not-allowed;
  opacity: 0.5;
}
:global([data-slot="select-trigger"].trigger[data-size="default"]) {
  height: 2.25rem;
}
:global([data-slot="select-trigger"].trigger[data-size="sm"]) {
  height: 2rem;
}
:global([data-slot="select-trigger"].trigger) :global(svg) {
  pointer-events: none;
  flex-shrink: 0;
  width: var(--spacing-4);
  height: var(--spacing-4);
}
:global([data-slot="select-trigger"].trigger)
  > :global([data-slot="select-value"]) {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  overflow: hidden;
  text-overflow: ellipsis;
  line-clamp: 1;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
:global(.select-trigger-chevron-icon) {
  width: var(--spacing-4);
  height: var(--spacing-4);
  opacity: 0.5;
}
</style>
