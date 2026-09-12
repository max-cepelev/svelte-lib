<script lang="ts">
import { XIcon } from '@lucide/svelte';
import { Select as SelectPrimitive } from 'bits-ui';
import ChipsValue from './ChipsValue.svelte';

type ValueSnippetProps = Parameters<
  NonNullable<SelectPrimitive.ValueProps['children']>
>[0];
type MultipleSelection = Extract<
  ValueSnippetProps['selection'],
  { type: 'multiple' }
>;
type ValueProps = SelectPrimitive.ValueProps & {
  /** Shows a button that clears all values in a multiple Select. */
  clearable?: boolean;
  /** Accessible label and tooltip for the clear button. */
  clearLabel?: string;
};

let {
  ref = $bindable(null),
  class: className,
  children: childrenProp,
  placeholder,
  clearable = false,
  clearLabel = 'Clear selection',
  ...restProps
}: ValueProps = $props();

function handleClearPointerDown(event: PointerEvent) {
  event.preventDefault();
  event.stopPropagation();
}

function clearSelection(selection: MultipleSelection, event: MouseEvent) {
  event.preventDefault();
  event.stopPropagation();
  selection.setValue([]);
}
</script>

<SelectPrimitive.Value
  bind:ref
  data-slot="select-value"
  class={['value', className]}
  {placeholder}
  {...restProps}
>
  {#snippet children(props: ValueSnippetProps)}
    {#if childrenProp}
      {@render childrenProp(props)}
    {:else if props.selection.type === 'multiple'}
      {#if props.selection.selected.length > 0}
        <ChipsValue disabled={props.disabled} selection={props.selection} />
      {:else}
        {props.placeholder}
      {/if}
    {:else}
      {props.selection.selected?.label ?? props.placeholder}
    {/if}
    {#if clearable && props.selection.type === 'multiple' && props.selection.selected.length > 0}
      <button
        aria-label={clearLabel}
        class="clear"
        data-slot="select-value-clear"
        disabled={props.disabled}
        onclick={(event) => clearSelection(props.selection, event)}
        onkeydown={(event) => event.stopPropagation()}
        onpointerdown={handleClearPointerDown}
        title={clearLabel}
        type="button"
      >
        <XIcon />
      </button>
    {/if}
  {/snippet}
</SelectPrimitive.Value>

<style>
@layer max-ts-svelte-components {
  :global([data-slot="select-value"].value) {
    display: flex;
    min-width: 0;
    flex: 1;
    align-items: center;
    gap: var(--spacing-2);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .clear {
    display: inline-flex;
    width: var(--spacing-5);
    height: var(--spacing-5);
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-small);
    background-color: transparent;
    color: var(--colors-text-secondary);
    cursor: pointer;
    transition-property: color, background-color;
    transition-duration: 0.2s;

    &:hover {
      background-color: var(--colors-background-elementHover);
      color: var(--colors-text-primary);
    }
    &:focus-visible {
      outline: 2px solid var(--colors-info);
      outline-offset: 1px;
    }
    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
    & :global(svg) {
      width: var(--spacing-4);
      height: var(--spacing-4);
      pointer-events: none;
    }
  }
}
</style>
