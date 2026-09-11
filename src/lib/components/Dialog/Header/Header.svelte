<script lang="ts">
import type { DialogHeaderProps } from '../types';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: DialogHeaderProps = $props();

const classNames = $derived(['header', className]);
</script>

<div
  bind:this={ref}
  data-slot="dialog-header"
  class={classNames}
  {...restProps}
>
  {@render children?.()}
</div>

<style>
@layer max-ts-svelte-components {
  .header {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
    text-align: center;
  }
  @media screen and (min-width: 640px) {
    .header {
      text-align: left;
    }
  }
}
</style>
