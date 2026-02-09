<script lang="ts">
import { Accordion as AccordionPrimitive } from 'bits-ui';
import type { WithoutChild } from '../../../types.ts';
import styles from './styles.css';

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
  class={styles.content}
  {...restProps}
>
  <div class={[styles.inner, className]}>{@render children?.()}</div>
</AccordionPrimitive.Content>
