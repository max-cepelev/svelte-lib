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
  data-slot="spinner"
  data-size={size}
  class={className}
  {...restProps}
/>

<style>
@layer max-ts-svelte-components {
  :global {
    [data-slot="spinner"] {
      display: inline-block;
      animation: spin 1s linear infinite;
      &[data-size="small"] {
        width: var(--spacing-4);
        height: var(--spacing-4);
      }
      &[data-size="medium"] {
        width: var(--spacing-6);
        height: var(--spacing-6);
      }
      &[data-size="large"] {
        width: var(--spacing-8);
        height: var(--spacing-8);
      }
    }
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
