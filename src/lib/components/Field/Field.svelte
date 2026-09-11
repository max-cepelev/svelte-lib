<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '../../types.ts';

import type { FieldOrientation } from './types';

let {
  ref = $bindable(null),
  class: className,
  orientation = 'vertical',
  children,
  ...restProps
}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
  orientation?: FieldOrientation;
} = $props();
</script>

<!-- biome-ignore lint/a11y/useSemanticElements: A fieldset would change this layout primitive's form semantics. -->
<div
  bind:this={ref}
  role="group"
  data-slot="field"
  data-orientation={orientation}
  class={[`base variant-${orientation}`, className]}
  {...restProps}
>
  {@render children?.()}
</div>

<style>
@layer max-ts-svelte-components {
  .base {
    display: flex;
    width: 100%;
    gap: var(--spacing-1);
  }
  .base[data-invalid="true"] {
    color: var(--colors-error);
  }
  .variant-vertical {
    flex-direction: column;
  }
  .variant-vertical > :global(*) {
    width: 100%;
  }
  .variant-horizontal {
    flex-direction: row;
    align-items: center;
  }
  .variant-horizontal > :global([data-slot="field-label"]) {
    flex: 1 1 0%;
  }
  .variant-horizontal:has(> :global([data-slot="field-content"])) {
    align-items: flex-start;
  }
  .variant-horizontal:has(> :global([data-slot="field-content"]))
    > :global([role="checkbox"]),
  .variant-horizontal:has(> :global([data-slot="field-content"]))
    > :global([role="radio"]) {
    margin-top: 1px;
  }
  .variant-responsive {
    flex-direction: column;
  }
  .variant-responsive > :global(*) {
    width: 100%;
  }
  .variant-responsive > :global([data-slot="field-label"]) {
    width: 100%;
  }
  .variant-responsive:has(> :global([data-slot="field-content"])) {
    width: 100%;
  }
  .variant-responsive:has(> :global([data-slot="field-content"]))
    > :global([role="checkbox"]),
  .variant-responsive:has(> :global([data-slot="field-content"]))
    > :global([role="radio"]) {
    width: 100%;
  }
  @media (min-width: 768px) {
    .variant-responsive {
      flex-direction: row;
      align-items: center;
    }
    .variant-responsive > :global(*) {
      width: auto;
    }
    .variant-responsive > :global([data-slot="field-label"]) {
      flex: 1 1 0%;
    }
    .variant-responsive:has(> :global([data-slot="field-content"])) {
      align-items: flex-start;
    }
    .variant-responsive:has(> :global([data-slot="field-content"]))
      > :global([role="checkbox"]),
    .variant-responsive:has(> :global([data-slot="field-content"]))
      > :global([role="radio"]) {
      margin-top: 1px;
    }
  }
}
</style>
