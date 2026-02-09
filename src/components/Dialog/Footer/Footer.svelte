<script lang="ts">
import type { DialogFooterProps } from '../types';
import { footer as footerStyle } from '../styles.css';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: DialogFooterProps = $props();

const classNames = $derived([footerStyle, className]);
</script>

<div
  bind:this={ref}
  data-slot="dialog-footer"
  class={classNames}
  {...restProps}
>
  {@render children?.()}
</div>
