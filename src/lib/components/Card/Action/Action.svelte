<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '../../../types.ts';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
  bind:this={ref}
  data-slot="card-action"
  class={["action", className]}
  {...restProps}
>
  {@render children?.()}
</div>

<style>
.action {
  grid-column: 2;
  grid-row-start: 1;
  grid-row-end: span 2;
  justify-self: end;
  align-self: start;
}
</style>
