<script lang="ts">
import { Loader } from '@lucide/svelte';
import type { ComponentProps } from 'svelte';

import type { SpinnerSize } from './types';

let {
  class: className,
  size = 'medium',
  ...restProps
}: ComponentProps<typeof Loader> & {
  size?: SpinnerSize;
} = $props();
</script>

<Loader
  role="status"
  aria-label="Loading"
  class={["spinner", `spinner-size-${size}`, className]}
  {...restProps}
/>

<style>
:global(.spinner) {
  display: inline-block;
  animation: spin 1s linear infinite;
}
:global(.spinner-size-small) {
  width: var(--spacing-4);
  height: var(--spacing-4);
}
:global(.spinner-size-medium) {
  width: var(--spacing-6);
  height: var(--spacing-6);
}
:global(.spinner-size-large) {
  width: var(--spacing-8);
  height: var(--spacing-8);
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
