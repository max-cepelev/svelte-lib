<script lang="ts">
import { Label } from 'bits-ui';

import type { LabelProps } from './types';

let {
  ref = $bindable(null),
  class: className,
  required,
  ...restProps
}: LabelProps = $props();
</script>

<Label.Root
  bind:ref
  data-slot="label"
  data-required={required || undefined}
  class={className}
  {...restProps}
/>

<style>
@layer max-ts-svelte-components {
  :global {
    [data-slot="label"] {
      display: flex;
      align-items: center;
      gap: var(--spacing-1);
      font-size: var(--fontSize-sm);
      line-height: normal;
      font-weight: var(--fontWeight-medium);
      user-select: none;
      &[data-disabled="true"] {
        pointer-events: none;
        opacity: 0.5;
      }
      &:has([data-disabled="true"]) {
        pointer-events: none;
        opacity: 0.5;
      }
      &[data-required]::after {
        content: "*";
        margin-top: var(--spacing-1);
        color: var(--colors-error);
      }
    }
  }
}
</style>
