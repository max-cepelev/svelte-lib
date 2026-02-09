<script lang="ts">
import type { DialogHeaderProps } from '../types';
import { header as headerStyle } from '../styles.css';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: DialogHeaderProps = $props();

const classNames = $derived([headerStyle, className]);
</script>

<div
  bind:this={ref}
  data-slot="dialog-header"
  class={classNames}
  {...restProps}
>
  {@render children?.()}
</div>
