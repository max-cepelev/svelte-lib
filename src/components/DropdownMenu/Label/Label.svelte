<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '../../../types.ts';
import { label } from './styles.css';

let {
  ref = $bindable(null),
  class: className,
  inset,
  children,
  ...restProps
}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
  inset?: boolean;
} = $props();
</script>

<div
  bind:this={ref}
  data-slot="dropdown-menu-label"
  data-inset={inset}
  class={[label, className]}
  {...restProps}
>
  {@render children?.()}
</div>
