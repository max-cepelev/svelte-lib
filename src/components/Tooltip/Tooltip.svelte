<script lang="ts">
import { Tooltip as TooltipPrimitive } from 'bits-ui';
import { Content } from './Content/index.js';
import { Provider } from './Provider/index.js';
import { Trigger } from './Trigger/index.js';
import type { TooltipProps } from './types.js';

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
    <Trigger>
			{@render children?.()}
		</Trigger>
    <Content
			class={className} 
			{alignOffset}
			{sideOffset}
			{side}
			{arrow}
			hideWhenDetached>
      {#if typeof content === 'string'}
				{content}
			{:else}
				{@render content?.()}
			{/if}
    </Content>
  </TooltipPrimitive.Root>
</Provider>