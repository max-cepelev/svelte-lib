<script lang="ts">
import type { DialogFooterProps } from '../types';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: DialogFooterProps = $props();

const classNames = $derived(['footer', className]);
</script>

<div
  bind:this={ref}
  data-slot="dialog-footer"
  class={classNames}
  {...restProps}
>
  {@render children?.()}
</div>

<style>
@layer max-ts-svelte-components {
  .footer {
    display: flex;
    flex-direction: column-reverse;
    gap: var(--spacing-2);
  }
  @media screen and (min-width: 640px) {
    .footer {
      flex-direction: row;
      justify-content: flex-end;
    }
  }
}
</style>
