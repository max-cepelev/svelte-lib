<script lang="ts">
import { Tabs as TabsPrimitive } from 'bits-ui';

import type { TabsProps } from './types';

type RootChildProps = Parameters<
  NonNullable<TabsPrimitive.RootProps['child']>
>[0];

let {
  ref = $bindable(null),
  value = $bindable(''),
  orientation = 'horizontal',
  class: className,
  children,
  ...restProps
}: TabsProps = $props();
</script>

{#snippet root({
  props,
}: RootChildProps)}
  {@const { class: rootClass, ...rootProps } = props}
  <div {...rootProps} class={['root', rootClass]}>
    {@render children?.()}
  </div>
{/snippet}

<TabsPrimitive.Root
  bind:ref
  bind:value
  child={root}
  data-slot="tabs"
  {orientation}
  class={className}
  {...restProps}
/>

<style>
@layer max-ts-svelte-components {
  .root {
    display: flex;
    gap: var(--spacing-2);
    &[data-orientation="horizontal"] {
      flex-direction: column;
    }
    &[data-orientation="vertical"] {
      flex-direction: row;
      align-items: flex-start;
    }
  }
}
</style>
