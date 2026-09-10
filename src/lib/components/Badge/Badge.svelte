<script lang="ts">
import type { BadgeProps } from './types';

let {
  ref = $bindable(null),
  href,
  class: className,
  variant = 'default',
  children,
  ...restProps
}: BadgeProps = $props();

const classNames = $derived(['badge', className]);
</script>

<svelte:element
  this={href ? "a" : "span"}
  bind:this={ref}
  data-slot="badge"
  data-variant={variant}
  {href}
  class={classNames}
  {...restProps}
>
  {@render children?.()}
</svelte:element>

<style>
.badge {
  display: inline-flex;
  width: fit-content;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-1);
  overflow: hidden;
  border-radius: var(--radius-small);
  border: 1px solid transparent;
  padding: 2px var(--spacing-2);
  font-size: var(--fontSize-xs);
  font-weight: var(--fontWeight-medium);
  white-space: nowrap;
  transition:
    color 0.2s,
    background-color 0.2s,
    box-shadow 0.2s;
  text-decoration: none;
  outline: none;

  &:focus-visible {
    box-shadow:
      0 0 0 2px var(--colors-background-paper),
      0 0 0 4px var(--colors-primary);
  }
  & > :global(svg) {
    pointer-events: none;
    width: var(--spacing-3);
    height: var(--spacing-3);
  }

  &[data-variant="default"] {
    background-color: var(--colors-primary);
    color: var(--colors-foreground-primary);
  }
  &[data-variant="default"][href]:hover {
    background-color: color-mix(
      in oklch,
      var(--colors-primary) 90%,
      transparent
    );
  }
  &[data-variant="secondary"] {
    background-color: var(--colors-background-elementHover);
    color: var(--colors-foreground-secondary);
  }
  &[data-variant="secondary"][href]:hover {
    background-color: color-mix(
      in oklch,
      var(--colors-secondary) 90%,
      transparent
    );
  }
  &[data-variant="destructive"] {
    background-color: var(--colors-error);
    color: var(--colors-foreground-primary);
  }
  &[data-variant="outline"] {
    background-color: transparent;
    color: var(--colors-text-primary);
    border: 1px solid var(--colors-border);
  }
  &[data-variant="outline"][href]:hover {
    background-color: color-mix(
      in oklch,
      var(--colors-border) 90%,
      transparent
    );
  }
}
</style>
