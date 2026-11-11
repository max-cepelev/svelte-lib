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
  {@const { class: triggerClass, disabled, ...triggerProps } = props}
  <div
    {...triggerProps}
    aria-disabled={disabled ? 'true' : undefined}
    aria-expanded={triggerProps['aria-expanded'] === 'true'}
    class={['trigger', triggerClass]}
    role="combobox"
    tabindex={disabled ? undefined : 0}
  >
    {@render children?.()}
    <span class="chevron" data-state={triggerProps['data-state']}>
      <ChevronDownIcon size={16} />
    </span>
  </div>
{/snippet}

{#snippet singleTrigger({ props }: TriggerChildProps)}
  {@const { class: triggerClass, type = 'button', ...triggerProps } = props}
  <button {...triggerProps} class={['trigger', triggerClass]} {type}>
    {@render children?.()}
    <span class="chevron" data-state={triggerProps['data-state']}>
      <ChevronDownIcon size={16} />
    </span>
  </button>
{/snippet}

<SelectPrimitive.Trigger
  bind:ref
  child={select.type === 'multiple' ? multipleTrigger : singleTrigger}
  data-slot="select-trigger"
  data-size={size}
  class={className}
  {...restProps}
/>

<style>
@layer max-ts-svelte-components {
  .trigger {
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
  .trigger[data-placeholder] {
    color: var(--colors-text-secondary);
  }
  .trigger:focus-visible {
    border-color: var(--colors-info);
    box-shadow: 0 0 0 3px var(--colors-info);
  }
  .trigger[aria-invalid="true"] {
    box-shadow: 0 0 0 3px rgba(var(--colors-error), 0.2);
    border-color: var(--colors-error);
  }
  .trigger[data-disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .trigger[data-size="default"] {
    height: 2.25rem;
  }
  .trigger[data-size="sm"] {
    height: 2rem;
  }
  .chevron {
    display: inline-flex;
    width: var(--spacing-4);
    height: var(--spacing-4);
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    opacity: 0.5;
    pointer-events: none;
    transition: transform 0.2s ease;
  }
  .chevron[data-state="open"] {
    transform: rotate(180deg);
  }
}
</style>
