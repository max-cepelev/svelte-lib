<script lang="ts">
import { Accordion as AccordionPrimitive } from 'bits-ui';
import styles from './styles.css';

let {
  ref = $bindable(null),
  class: className,
  ...restProps
}: AccordionPrimitive.ItemProps = $props();
</script>

<AccordionPrimitive.Item
  bind:ref
  data-slot="accordion-item"
  class={[styles.item, className]}
  {...restProps}
/>
