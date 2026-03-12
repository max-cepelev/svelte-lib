<script lang="ts">
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '../../../types.ts';
import styles from './styles.css';

let {
  ref = $bindable(null),
  class: className,
  children,
  errors,
  ...restProps
}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
  children?: Snippet;
  errors?: string[];
} = $props();

const hasContent = $derived.by(() => {
  // has slotted error
  if (children) return true;

  // no errors
  if (!errors?.length) return false;

  return true;
});

const isMultipleErrors = $derived(errors && errors.length > 1);
const singleErrorMessage = $derived(
  errors?.length === 1 ? errors[0] : undefined,
);
</script>

{#if hasContent}
  <div
    bind:this={ref}
    role="alert"
    data-slot="field-error"
    class={[styles.root, className]}
    {...restProps}
  >
    {#if children}
      {@render children()}
    {:else if singleErrorMessage}
      {singleErrorMessage}
    {:else if isMultipleErrors}
      <ul>
        {#each errors ?? [] as error, index (index)}
          {#if error}
            <li>{error}</li>
          {/if}
        {/each}
      </ul>
    {/if}
  </div>
{/if}
