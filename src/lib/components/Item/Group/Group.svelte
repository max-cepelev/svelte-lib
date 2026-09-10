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

<!-- biome-ignore lint/a11y/useSemanticElements: The generic group supports polymorphic item content. -->
<div
  bind:this={ref}
  role="list"
  data-slot="item-group"
  class={["group", className]}
  {...restProps}
>
  {@render children?.()}
</div>

<style>
.group {
  display: flex;
  flex-direction: column;
}
</style>
