<script lang="ts">
import { Select as SelectPrimitive } from 'bits-ui';
import ChipsValue from './ChipsValue.svelte';

type ValueSnippetProps = Parameters<
  NonNullable<SelectPrimitive.ValueProps['children']>
>[0];

let {
  ref = $bindable(null),
  class: className,
  children: childrenProp,
  placeholder,
  ...restProps
}: SelectPrimitive.ValueProps = $props();
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
  {/snippet}
</SelectPrimitive.Value>

<style>
:global([data-slot="select-value"].value) {
  display: flex;
  min-width: 0;
  flex: 1;
  align-items: center;
  overflow: hidden;
}
</style>
