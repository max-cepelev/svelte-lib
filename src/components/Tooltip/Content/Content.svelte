<script lang="ts">
import { Tooltip as TooltipPrimitive } from 'bits-ui';
import type { ComponentProps } from 'svelte';
import type { WithoutChildrenOrChild } from '~/types';
import { Portal } from '../Portal';
import styles from './styles.css';

let {
  ref = $bindable(null),
  class: className,
  sideOffset = 0,
  side = 'top',
  children,
  arrowClasses,
  portalProps,
  arrow,
  ...restProps
}: TooltipPrimitive.ContentProps & {
  arrowClasses?: string;
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
    class={[
			styles.content,
			className
		]}
    {...restProps}
  >
    {@render children?.()}
    {#if arrow}
      <TooltipPrimitive.Arrow>
        {#snippet child({ props })}
          <div
            class={[
							styles.arrow,
							arrowClasses
						]}
            {...props}
          ></div>
        {/snippet}
      </TooltipPrimitive.Arrow>
    {/if}
  </TooltipPrimitive.Content>
</Portal>
