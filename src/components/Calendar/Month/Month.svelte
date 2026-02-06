<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '~/types';

let {
  ref = $bindable(null),
  children,
  ...restProps
}: WithElementRef<HTMLAttributes<HTMLElement>> = $props();
</script>

<div {...restProps} bind:this={ref} style="display:flex;flex-direction:column;">
  {@render children?.()}
</div>
