<script lang="ts">
import { Tabs as TabsPrimitive } from 'bits-ui';
import type { TabsContentProps } from '../types';

type ContentChildProps = Parameters<
  NonNullable<TabsPrimitive.ContentProps['child']>
>[0];

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: TabsContentProps = $props();
</script>

{#snippet content({ props }: ContentChildProps)}
  {@const { class: contentClass, ...contentProps } = props}
  <div {...contentProps} class={["content", contentClass]}>
    {@render children?.()}
  </div>
{/snippet}

<TabsPrimitive.Content
  bind:ref
  child={content}
  data-slot="tabs-content"
  class={className}
  {...restProps}
/>

<style>
@layer max-ts-svelte-components {
  .content {
    flex: 1;
    color: var(--colors-text-primary);
    font-size: var(--fontSize-sm);
    outline: none;
  }
}
</style>
