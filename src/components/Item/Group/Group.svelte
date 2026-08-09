<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '../../../types.ts';
import styles from '../styles.css';

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
  class={[styles.group, className]}
  {...restProps}
>
  {@render children?.()}
</div>
