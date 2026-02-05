<script lang="ts">
import type { HTMLFieldsetAttributes } from 'svelte/elements';
import type { WithElementRef } from '../../../types.js';
import styles from './styles.css.js';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: WithElementRef<HTMLFieldsetAttributes> = $props();
</script>

<fieldset
  bind:this={ref}
  data-slot="field-set"
  class={[styles.root, className]}
  {...restProps}
>
  {@render children?.()}
</fieldset>
