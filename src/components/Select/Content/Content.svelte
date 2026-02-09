<script lang="ts">
import { Select as SelectPrimitive } from 'bits-ui';
import type { ComponentProps } from 'svelte';
import type { WithoutChild, WithoutChildrenOrChild } from '../../../types.ts';
import { Portal } from '../Portal';
import { ScrollDownButton } from '../ScrollDownButton';
import { ScrollUpButton } from '../ScrollUpButton';
import styles from './styles.css';

let {
  ref = $bindable(null),
  class: className,
  sideOffset = 4,
  portalProps,
  children,
  preventScroll = true,
  ...restProps
}: WithoutChild<SelectPrimitive.ContentProps> & {
  portalProps?: WithoutChildrenOrChild<ComponentProps<typeof Portal>>;
} = $props();
</script>

<Portal {...portalProps}>
  <SelectPrimitive.Content
    bind:ref
    {sideOffset}
    {preventScroll}
    data-slot="select-content"
    class={[styles.content, className]}
    {...restProps}
  >
    <ScrollUpButton />
    <SelectPrimitive.Viewport class={styles.viewport}>
      {@render children?.()}
    </SelectPrimitive.Viewport>
    <ScrollDownButton />
  </SelectPrimitive.Content>
</Portal>
