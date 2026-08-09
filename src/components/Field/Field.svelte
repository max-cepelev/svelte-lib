<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '../../types.ts';
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

<!-- biome-ignore lint/a11y/useSemanticElements: A fieldset would change this layout primitive's form semantics. -->
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
