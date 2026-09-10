<script lang="ts">
import type { ItemMediaProps } from '../types';

let {
  ref = $bindable(null),
  class: className,
  children,
  variant = 'default',
  ...restProps
}: ItemMediaProps = $props();
</script>

<div
  bind:this={ref}
  data-slot="item-media"
  data-variant={variant}
  class={["media", `variant-${variant}`, className]}
  {...restProps}
>
  {@render children?.()}
</div>

<style>
.media {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
}
:global([data-slot="item"]:has([data-slot="item-description"])) .media {
  transform: translateY(2px);
  align-self: flex-start;
}
.media :global(svg) {
  pointer-events: none;
}
.variant-default {
  background-color: transparent;
}
.variant-icon {
  background-color: var(--colors-background-element);
  width: var(--spacing-8);
  height: var(--spacing-8);
  border-radius: var(--radius-small);
  border: 1px solid var(--colors-border);
}
.variant-image {
  width: var(--spacing-10);
  height: var(--spacing-10);
  overflow: hidden;
  border-radius: var(--radius-small);
}
.variant-icon :global(svg:not([class*="size-"])) {
  width: var(--spacing-4);
  height: var(--spacing-4);
}
.variant-image :global(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
