<script lang="ts">
import type { ComponentProps } from 'svelte';
import { Label } from '../../Label';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: ComponentProps<typeof Label> = $props();
</script>

<Label bind:ref data-slot="field-label" class={className} {...restProps}>
  {@render children?.()}
</Label>

<style>
@layer max-ts-svelte-components {
  :global {
    [data-slot="field-label"] {
      display: flex;
      width: fit-content;
      align-items: center;
      gap: var(--spacing-2);
      line-height: var(--lineHeight-snug);
      font-size: var(--fontSize-sm);
      cursor: pointer;
      [data-slot="field"][data-disabled="true"] & {
        opacity: 0.5;
      }
      /* A label wrapping a whole Field renders as a selectable card */
      &:has(> [data-slot="field"]) {
        width: 100%;
        flex-direction: column;
        border-radius: var(--radius-medium);
        border-width: 1px;
        border-style: solid;
        border-color: var(--colors-border);
      }
      &:has(> [data-slot="field"][data-state="checked"]) {
        background-color: color-mix(
          in oklch,
          var(--colors-primary) 5%,
          transparent
        );
        border-color: var(--colors-primary);
      }
      & > [data-slot="field"] {
        padding: var(--spacing-4);
      }
    }
  }
}
</style>
