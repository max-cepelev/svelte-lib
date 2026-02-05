<script lang="ts">
import { Tabs as TabsPrimitive } from 'bits-ui';
import styles from '../styles.css.js';
import type { TabsTriggerProps } from '../types.js';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: TabsTriggerProps = $props();
</script>

<TabsPrimitive.Trigger
  bind:ref
  data-slot="tabs-trigger"
  class={[styles.trigger, className]}
  {...restProps}
>
  {@render children?.()}
</TabsPrimitive.Trigger>
