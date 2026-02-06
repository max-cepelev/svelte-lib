<script lang="ts">
import { type SeparatorProps, Separator } from '../../Separator';

import styles from './styles.css';

let {
  ref = $bindable(null),
  class: className,
  ...restProps
}: SeparatorProps = $props();
</script>

<Separator
  bind:ref
  data-slot="select-separator"
  class={[styles.separator, className]}
  {...restProps}
/>
