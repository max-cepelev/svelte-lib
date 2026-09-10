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

<AccordionPrimitive.Header {level} class="accordion-trigger-header">
  <AccordionPrimitive.Trigger
    data-slot="accordion-trigger"
    bind:ref
    class={["trigger", className]}
    {...restProps}
  >
    {@render children?.()}
    <ChevronDownIcon class="accordion-trigger-icon" />
  </AccordionPrimitive.Trigger>
</AccordionPrimitive.Header>

<style>
:global(.accordion-trigger-header) {
  display: flex;
}
:global([data-slot="accordion-trigger"].trigger) {
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
}
:global([data-slot="accordion-trigger"].trigger:focus-visible) {
  box-shadow: 0 0 0 3px var(--colors-info);
  border-color: var(--colors-info);
}
:global([data-slot="accordion-trigger"].trigger[disabled]) {
  pointer-events: none;
  opacity: 0.5;
}
:global([data-slot="accordion-trigger"].trigger[data-state="open"])
  > :global(svg) {
  transform: rotate(180deg);
}
:global(.accordion-trigger-icon) {
  color: var(--colors-text-secondary);
  pointer-events: none;
  width: var(--spacing-4);
  height: var(--spacing-4);
  flex-shrink: 0;
  transform: translateY(0.125rem);
  transition-property: transform;
  transition-duration: 200ms;
}
</style>
