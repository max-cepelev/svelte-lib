<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '../../types.ts';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
  bind:this={ref}
  data-slot="empty"
  class={["root", className]}
  {...restProps}
>
  {@render children?.()}
</div>

<style>
.root {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-6);
  border-radius: var(--radius-large);
  border: 2px dashed var(--colors-border);
  padding: var(--spacing-6);
  text-align: center;
  text-wrap: balance;
}
@media (min-width: 768px) {
  .root {
    padding: var(--spacing-12);
  }
}
</style>
