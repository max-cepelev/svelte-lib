<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '../../types.ts';

import type { AlertVariant } from './types';

let {
  ref = $bindable(null),
  class: className,
  variant = 'default',
  children,
  ...restProps
}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
  variant?: AlertVariant;
} = $props();

const classNames = $derived(['alert', className]);
</script>

<div
  bind:this={ref}
  data-slot="alert"
  data-variant={variant}
  class={classNames}
  {...restProps}
  role="alert"
>
  {@render children?.()}
</div>

<style>
.alert {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  grid-template-areas:
    "icon title"
    "description description";
  align-items: center;
  gap: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-large);
  border: 1px solid var(--colors-border);
  padding: var(--spacing-3) var(--spacing-4);
  font-size: var(--fontSize-sm);

  &[data-variant="default"] {
    background-color: var(--colors-background-paper);
    color: var(--colors-text-primary);
    border-color: var(--colors-border);
  }
  &[data-variant="error"] {
    color: var(--colors-error);
    background-color: var(--colors-background-paper);
    border-color: var(--colors-error);
  }
  &[data-variant="info"] {
    color: var(--colors-info);
    background-color: var(--colors-background-paper);
    border-color: var(--colors-info);
  }
  &[data-variant="success"] {
    color: var(--colors-success);
    background-color: var(--colors-background-paper);
    border-color: var(--colors-success);
  }
  & > :global(svg) {
    width: 1rem;
    height: 1rem;
    color: currentColor;
  }
}
</style>
