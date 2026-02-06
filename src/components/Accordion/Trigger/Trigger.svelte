<script lang="ts">
import { ChevronDownIcon } from '@lucide/svelte';
import { Accordion as AccordionPrimitive } from 'bits-ui';
import type { WithoutChild } from '~/types';
import styles from './styles.css';

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

<AccordionPrimitive.Header {level} class={styles.header}>
  <AccordionPrimitive.Trigger
    data-slot="accordion-trigger"
    bind:ref
    class={[styles.trigger, className]}
    {...restProps}
  >
    {@render children?.()}
    <ChevronDownIcon class={styles.icon} />
  </AccordionPrimitive.Trigger>
</AccordionPrimitive.Header>
