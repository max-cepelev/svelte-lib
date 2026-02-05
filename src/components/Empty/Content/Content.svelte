<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements';

import styles from '../styles.css.js';
import type { WithElementRef } from '../../../types.js';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
  bind:this={ref}
  data-slot="empty-content"
  class={[styles.content, className]}
  {...restProps}
>
  {@render children?.()}
</div>
