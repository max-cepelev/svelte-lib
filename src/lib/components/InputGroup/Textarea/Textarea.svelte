<script lang="ts">
import type { InputGroupTextareaProps } from '../types';

let {
  ref = $bindable(null),
  value = $bindable(),
  class: className,
  ...restProps
}: InputGroupTextareaProps = $props();

const classNames = $derived(['textarea', className]);
</script>

<textarea
  bind:this={ref}
  data-slot="input-group-control"
  class={classNames}
  bind:value
  {...restProps}
></textarea>

<style>
@layer max-ts-svelte-components {
  .textarea {
    flex: 1;
    width: 100%;
    border: none;
    background-color: transparent;
    color: var(--colors-text-primary);
    font-size: var(--fontSize-base);
    line-height: var(--lineHeight-normal);
    padding-inline: var(--spacing-3);
    padding-block: var(--spacing-3);
    min-height: var(--spacing-12);
    min-width: 0;
    box-shadow: none;
    border-radius: 0;
    resize: none;
    appearance: none;
  }
  .textarea:focus-visible {
    outline: none;
    box-shadow: none;
  }
  .textarea::placeholder {
    color: var(--colors-text-hint);
  }
  .textarea:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
