<script lang="ts">
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '../../../types.ts';
import { Separator } from '../../Separator';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
  children?: Snippet;
} = $props();

const hasContent = $derived(!!children);
</script>

<div
  bind:this={ref}
  data-slot="field-separator"
  data-content={hasContent}
  class={["root", className]}
  {...restProps}
>
  <Separator class="field-separator" />
  {#if children}
    <span class="content" data-slot="field-separator-content">
      {@render children()}
    </span>
  {/if}
</div>

<style>
.root {
  position: relative;
  margin-block: calc(-1 * var(--spacing-2));
  height: var(--spacing-5);
  font-size: var(--fontSize-sm);
}
:global([data-slot="field-group"][data-variant="outline"]) .root {
  margin-bottom: calc(-1 * var(--spacing-2));
}
:global(.field-separator) {
  position: absolute;
  top: 50%;
  inset-inline: 0;
}
.content {
  position: relative;
  margin-inline: auto;
  display: block;
  width: fit-content;
  padding-inline: var(--spacing-2);
  background-color: var(--colors-background-paper);
  color: var(--colors-text-secondary);
}
</style>
