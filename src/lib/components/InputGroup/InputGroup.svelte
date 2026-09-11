<script lang="ts">
import type { InputGroupProps } from './types';

let {
  ref = $bindable(null),
  class: className,
  children,
  disabled = false,
  ...restProps
}: InputGroupProps = $props();

const classNames = $derived(['container', className]);
</script>

<!-- biome-ignore lint/a11y/useSemanticElements: A fieldset would change the input group's layout and form semantics. -->
<div
  bind:this={ref}
  role="group"
  data-slot="input-group"
  data-disabled={disabled ? 'true' : undefined}
  aria-disabled={disabled}
  class={classNames}
  {...restProps}
>
  {@render children?.()}
</div>

<style>
@layer max-ts-svelte-components {
  .container {
    position: relative;
    display: flex;
    width: 100%;
    align-items: stretch;
    border-radius: var(--radius-medium);
    border: 1px solid var(--colors-border);
    background-color: var(--colors-background-paper);
    box-shadow: var(--shadow-1);
    min-height: var(--spacing-9);
    padding: 0;
    overflow: hidden;
    transition:
      border-color 0.2s,
      box-shadow 0.2s,
      color 0.2s;
  }
  .container:has(> :global(textarea)) {
    min-height: auto;
  }
  .container:has(> :global([data-align="block-start"])) {
    flex-direction: column;
    align-items: stretch;
    min-height: auto;
    gap: var(--spacing-2);
  }
  .container:has(> :global([data-align="block-end"])) {
    flex-direction: column;
    align-items: stretch;
    min-height: auto;
    gap: var(--spacing-2);
  }
  .container:has(:global([data-slot="input-group-control"]:focus-visible)) {
    border-color: var(--colors-primary);
    box-shadow: var(--shadow-2);
  }
  .container:has(:global([data-slot][aria-invalid="true"])) {
    border-color: var(--colors-error);
    box-shadow: 0 0 0 3px
      color-mix(in oklch, var(--colors-error) 40%, transparent);
  }
  .container[data-disabled="true"] {
    opacity: 0.55;
    cursor: not-allowed;
  }
  .container > :global(*) {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
  }
  .container > :global([data-slot="input-group-control"]) {
    flex: 1;
    min-width: 0;
    align-self: stretch;
  }
  .container:has(> :global([data-align="inline-start"]))
    > :global([data-slot="input-group-control"]) {
    padding-left: var(--spacing-2);
  }
  .container:has(> :global([data-align="inline-end"]))
    > :global([data-slot="input-group-control"]) {
    padding-right: var(--spacing-2);
  }
  .container:has(> :global([data-align="block-start"]))
    > :global([data-slot="input-group-control"]) {
    padding-bottom: var(--spacing-3);
  }
  .container:has(> :global([data-align="block-end"]))
    > :global([data-slot="input-group-control"]) {
    padding-top: var(--spacing-3);
  }
}
</style>
