<script lang="ts">
import { Dialog as DialogPrimitive } from 'bits-ui';
import type { DialogOverlayProps } from '../types';
import { overlay as overlayStyle } from '../styles.css';

let {
  ref = $bindable(null),
  class: className,
  ...restProps
}: DialogOverlayProps = $props();

const classNames = $derived([overlayStyle, className]);
</script>

<DialogPrimitive.Overlay
  bind:ref
  data-slot="dialog-overlay"
  class={classNames}
  {...restProps}
/>
