<script lang="ts">
import { Dialog as DialogPrimitive } from 'bits-ui';
import type { DialogTitleProps } from '../types';
import { title as titleStyle } from '../styles.css';

let {
  ref = $bindable(null),
  class: className,
  ...restProps
}: DialogTitleProps = $props();

const classNames = $derived([titleStyle, className]);
</script>

<DialogPrimitive.Title
  bind:ref
  data-slot="dialog-title"
  class={classNames}
  {...restProps}
/>
