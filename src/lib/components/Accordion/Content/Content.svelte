<script lang="ts">
import { Accordion as AccordionPrimitive } from 'bits-ui';
import type { WithoutChild } from '../../../types.ts';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: WithoutChild<AccordionPrimitive.ContentProps> = $props();
</script>

<AccordionPrimitive.Content
  bind:ref
  data-slot="accordion-content"
  class="content"
  {...restProps}
>
  <div class={["inner", className]}>{@render children?.()}</div>
</AccordionPrimitive.Content>

<style>
:global([data-slot="accordion-content"].content) {
  overflow: hidden;
  padding-inline: var(--spacing-2);
}
:global([data-slot="accordion-content"].content[data-state="closed"]) {
  animation: accordion-up 0.2s ease-out;
}
:global([data-slot="accordion-content"].content[data-state="open"]) {
  animation: accordion-down 0.2s ease-out;
}
.inner {
  padding-top: 0;
  padding-bottom: var(--spacing-4);
}
@keyframes accordion-up {
  0% {
    height: var(--bits-accordion-content-height);
  }
  100% {
    height: 0;
  }
}
@keyframes accordion-down {
  from {
    height: 0;
  }
  to {
    height: var(--bits-accordion-content-height);
  }
}
</style>
