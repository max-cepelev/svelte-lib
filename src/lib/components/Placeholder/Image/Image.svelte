<script lang="ts">
import type { ImageProps } from './types';

let {
  class: className,
  size = 'medium',
  alt: altAttr = '',
  ...restProps
}: ImageProps = $props();
</script>

<img
  {...restProps}
  alt={altAttr}
  class={["wrapper", `size-${size}`, className]}
>

<style>
@layer max-ts-svelte-components {
  .wrapper {
    display: block;
    max-width: 100%;
    object-fit: contain;
    color: var(--colors-text-secondary);
  }
  .size-small {
    margin: auto auto var(--spacing-4);
  }
  .size-medium {
    margin: auto auto var(--spacing-8);
  }
  .size-large {
    margin: auto auto var(--spacing-10);
  }
  @media (max-width: 600px) {
    .wrapper {
      margin: auto auto var(--spacing-4);
    }
  }
}
</style>
