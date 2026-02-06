<script lang="ts">
import { Tooltip as TooltipPrimitive } from 'bits-ui';
import { Content } from './Content';
import { Provider } from './Provider';
import { Trigger } from './Trigger';
import type { TooltipProps } from './types';

let {
  open = $bindable(false),
  children,
  content,
  class: className,
  alignOffset = 0,
  sideOffset = 4,
  side = 'top',
  arrow,
  ...restProps
}: TooltipProps = $props();
</script>

<Provider>
  <TooltipPrimitive.Root bind:open {...restProps}>
    <Trigger>{@render children?.()}</Trigger>
    <Content
      class={className}
      {alignOffset}
      {sideOffset}
      {side}
      {arrow}
      hideWhenDetached
    >
      {#if typeof content === 'string'}
        {content}
      {:else}
        {@render content?.()}
      {/if}
    </Content>
  </TooltipPrimitive.Root>
</Provider>
