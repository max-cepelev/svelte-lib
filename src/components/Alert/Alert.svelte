<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '../../types.ts';
import { alertVariants } from './styles.css';
import type { AlertVariant } from './types';

let {
  ref = $bindable(null),
  class: className,
  variant = 'default',
  children,
  ...restProps
}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
  variant?: AlertVariant;
} = $props();

const classNames = $derived([alertVariants[variant], className]);
</script>

<div
  bind:this={ref}
  data-slot="alert"
  class={classNames}
  {...restProps}
  role="alert"
>
  {@render children?.()}
</div>
