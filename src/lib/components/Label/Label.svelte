<script lang="ts">
import { Label } from 'bits-ui';

import type { LabelProps } from './types';

let {
  ref = $bindable(null),
  class: className,
  required,
  ...restProps
}: LabelProps = $props();
</script>

<Label.Root
  bind:ref
  data-slot="label"
  class={[
		"label",
		{ 'required': required },
		className
	]}
  {...restProps}
/>

<style>
@layer max-ts-svelte-components {
  :global([data-slot="label"].label) {
    display: flex;
    align-items: center;
    gap: var(--spacing-1);
    font-size: var(--fontSize-sm);
    line-height: normal;
    font-weight: var(--fontWeight-medium);
    user-select: none;
  }
  :global([data-slot="label"].label[data-disabled="true"]) {
    pointer-events: none;
    opacity: 0.5;
  }
  :global([data-slot="label"].label:has([data-disabled="true"])) {
    pointer-events: none;
    opacity: 0.5;
  }
  :global([data-slot="label"].required:after) {
    content: "*";
    margin-top: var(--spacing-1);
    color: var(--colors-error);
  }
}
</style>
