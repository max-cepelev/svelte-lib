<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '~/types';
import { fieldVariants } from './styles.css';
import type { FieldOrientation } from './types';

let {
  ref = $bindable(null),
  class: className,
  orientation = 'vertical',
  children,
  ...restProps
}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
  orientation?: FieldOrientation;
} = $props();
</script>

<div
  bind:this={ref}
  role="group"
  data-slot="field"
  data-orientation={orientation}
  class={[fieldVariants[orientation], className]}
  {...restProps}
>
  {@render children?.()}
</div>
