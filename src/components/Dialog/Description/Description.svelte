<script lang="ts">
import { Dialog as DialogPrimitive } from 'bits-ui';
import type { DialogDescriptionProps } from '../types';
import { description as descriptionStyle } from '../styles.css';

let {
  ref = $bindable(null),
  class: className,
  ...restProps
}: DialogDescriptionProps = $props();

const classNames = $derived([descriptionStyle, className]);
</script>

<DialogPrimitive.Description
  bind:ref
  data-slot="dialog-description"
  class={classNames}
  {...restProps}
/>
