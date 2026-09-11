<script lang="ts">
import type { ButtonGroupProps } from './types';

let {
  ref = $bindable(null),
  class: className,
  children,
  orientation = 'horizontal',
  ...restProps
}: ButtonGroupProps = $props();

const classNames = $derived(['container', className]);
</script>

<!-- biome-ignore lint/a11y/useSemanticElements: A fieldset would change the component's layout and form semantics. -->
<div
  bind:this={ref}
  role="group"
  data-slot="button-group"
  data-orientation={orientation}
  class={classNames}
  {...restProps}
>
  {@render children?.()}
</div>

<style>
@layer max-ts-svelte-components {
  .container {
    display: flex;
    width: fit-content;
    align-items: stretch;
    &:has(> :global([data-slot="button-group"])) {
      gap: var(--spacing-2);
    }

    & > :global(*) {
      position: relative;
    }

    & > :global(*:focus-visible) {
      z-index: 10;
    }

    & > :global(input) {
      flex: 1;
    }

    &[data-orientation="horizontal"] {
      flex-direction: row;

      & > :global(*:not(:first-child)) {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-left-width: 0;
      }

      & > :global(*:not(:last-child)) {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }

      &:has(> :global(select[aria-hidden="true"]:last-child))
        > :global([data-slot="select-trigger"]:last-of-type) {
        border-top-right-radius: var(--radius-medium);
        border-bottom-right-radius: var(--radius-medium);
      }
    }

    &[data-orientation="vertical"] {
      flex-direction: column;

      & > :global(*:not(:first-child)) {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border-top-width: 0;
      }
      & > :global(*:not(:last-child)) {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
  }
}
</style>
