<script lang="ts">
import type { EmptyMediaProps } from '../types';

let {
  ref = $bindable(null),
  class: className,
  children,
  variant = 'default',
  ...restProps
}: EmptyMediaProps = $props();
</script>

<div
  bind:this={ref}
  data-slot="empty-icon"
  data-variant={variant}
  class={["media", `variant-${variant}`, className]}
  {...restProps}
>
  {@render children?.()}
</div>

<style>
.media {
  margin-bottom: var(--spacing-2);
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
}
.media :global(svg) {
  pointer-events: none;
  flex-shrink: 0;
}
.variant-default {
  background-color: transparent;
}
.variant-icon {
  background-color: var(--colors-background-element);
  color: var(--colors-text-primary);
  display: flex;
  width: var(--spacing-10);
  height: var(--spacing-10);
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-large);
}
.variant-icon :global(svg:not([class*="size-"])) {
  width: var(--spacing-6);
  height: var(--spacing-6);
}
</style>
