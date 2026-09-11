<script lang="ts">
import type { InputGroupInputProps } from '../types';

let {
  ref = $bindable(null),
  value = $bindable(),
  class: className,
  ...restProps
}: InputGroupInputProps = $props();

const classNames = $derived(['control', className]);
</script>

<input
  bind:this={ref}
  data-slot="input-group-control"
  class={classNames}
  bind:value
  {...restProps}
>

<style>
@layer max-ts-svelte-components {
  .control {
    flex: 1;
    width: 100%;
    border: none;
    background-color: transparent;
    color: var(--colors-text-primary);
    font-size: var(--fontSize-base);
    line-height: var(--lineHeight-normal);
    padding-inline: var(--spacing-3);
    padding-block: var(--spacing-2);
    min-height: var(--spacing-9);
    min-width: 0;
    box-shadow: none;
    border-radius: 0;
    appearance: none;
  }
  .control:focus-visible {
    outline: none;
    box-shadow: none;
  }
  .control::placeholder {
    color: var(--colors-text-hint);
  }
  .control:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
