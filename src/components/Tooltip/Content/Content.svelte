<script lang="ts">
import { Tooltip as TooltipPrimitive } from 'bits-ui';
import type { ComponentProps } from 'svelte';
import type { WithoutChildrenOrChild } from '../../../types.ts';
import { Portal } from '../Portal';
import styles from './styles.css';

let {
  ref = $bindable(null),
  class: className,
  sideOffset = 0,
  side = 'top',
  children,
  arrowClass,
  portalProps,
  arrow,
  ...restProps
}: TooltipPrimitive.ContentProps & {
  arrowClass?: string;
  arrow?: boolean;
  portalProps?: WithoutChildrenOrChild<ComponentProps<typeof Portal>>;
} = $props();
</script>

<Portal {...portalProps}>
  <TooltipPrimitive.Content
    bind:ref
    data-slot="tooltip-content"
    {sideOffset}
    {side}
    class={[styles.content, className]}
    {...restProps}
  >
    {@render children?.()}
    {#if arrow}
      <TooltipPrimitive.Arrow>
        {#snippet child({ props })}
          <svg
            class={[styles.arrow, arrowClass]}
            viewBox="0 0 7.68 4.35"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
          >
            <path
              d="m 0.52372243,0.10910656 c -0.1676883,0 -0.3188698,0.10099765 -0.38304509,0.25594925 -0.0641698,0.1548964 -0.0287017,0.3332318 0.0898753,0.4518088 L 3.5473966,4.1337031 c 0.077725,0.07778 0.1832001,0.1214516 0.2931533,0.1214516 0.1099531,0 0.2154286,-0.043672 0.2932085,-0.1214516 L 7.4505968,0.81686461 c 0.118577,-0.118577 0.1540119,-0.2969124 0.089831,-0.4518088 C 7.476247,0.21010421 7.3251098,0.10910656 7.1573882,0.10910656 Z"
              fill="inherit"
            />
          </svg>
        {/snippet}
      </TooltipPrimitive.Arrow>
    {/if}
  </TooltipPrimitive.Content>
</Portal>
