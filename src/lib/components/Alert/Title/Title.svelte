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
  data-slot="alert-title"
  class={["title", className]}
  {...restProps}
>
  {@render children?.()}
</div>

<style>
.title {
  grid-area: title;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  min-height: 1rem;
  font-weight: var(--fontWeight-medium);
  letter-spacing: -0.02em;
}
</style>
