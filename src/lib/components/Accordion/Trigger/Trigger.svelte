<script lang="ts">
import { ChevronDownIcon } from '@lucide/svelte';
import { Accordion as AccordionPrimitive } from 'bits-ui';
import type { WithoutChild } from '../../../types.ts';

let {
  ref = $bindable(null),
  class: className,
  level = 3,
  children,
  ...restProps
}: WithoutChild<AccordionPrimitive.TriggerProps> & {
  level?: AccordionPrimitive.HeaderProps['level'];
} = $props();
</script>

<AccordionPrimitive.Header {level} data-slot="accordion-header">
  <AccordionPrimitive.Trigger
    data-slot="accordion-trigger"
    bind:ref
    class={className}
    {...restProps}
  >
    {@render children?.()}
    <ChevronDownIcon data-slot="accordion-trigger-icon" />
  </AccordionPrimitive.Trigger>
</AccordionPrimitive.Header>

<style>
@layer max-ts-svelte-components {
  :global {
    [data-slot="accordion-header"] {
      display: flex;
    }
    [data-slot="accordion-trigger"] {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: space-between;
      gap: var(--spacing-4);
      padding: var(--spacing-2);
      border-radius: var(--radius-small);
      text-align: start;
      transition-property: all;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 150ms;
      outline: 2px solid transparent;
      outline-offset: 2px;
      &:focus-visible {
        box-shadow: 0 0 0 3px var(--colors-info);
        border-color: var(--colors-info);
      }
      &[disabled] {
        pointer-events: none;
        opacity: 0.5;
      }
      &[data-state="open"] > svg {
        transform: rotate(180deg);
      }
    }
    [data-slot="accordion-trigger-icon"] {
      color: var(--colors-text-secondary);
      pointer-events: none;
      width: var(--spacing-4);
      height: var(--spacing-4);
      flex-shrink: 0;
      transform: translateY(0.125rem);
      transition-property: transform;
      transition-duration: 200ms;
    }
  }
}
</style>
