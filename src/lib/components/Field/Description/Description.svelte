<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '../../../types.ts';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: WithElementRef<HTMLAttributes<HTMLParagraphElement>> = $props();
</script>

<p
  bind:this={ref}
  data-slot="field-description"
  class={["root", className]}
  {...restProps}
>
  {@render children?.()}
</p>

<style>
.root {
  color: var(--colors-text-disabled);
  font-size: var(--fontSize-sm);
  line-height: var(--lineHeight-normal);
  font-weight: var(--fontWeight-normal);
}
:global([data-slot="field"][data-orientation="horizontal"]) .root {
  text-wrap: balance;
}
.root:last-child {
  margin-top: 0;
}
.root:nth-last-child(2) {
  margin-top: calc(-1 * var(--spacing-1));
}
:global([data-variant="legend"]) + .root {
  margin-top: calc(-1.5 * var(--spacing-1));
}
.root > :global(a) {
  text-decoration-line: underline;
  text-underline-offset: 4px;
}
.root > :global(a:hover) {
  color: var(--colors-primary);
}
</style>
