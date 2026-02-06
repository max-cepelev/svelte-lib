<script lang="ts">
import { Label } from 'bits-ui';
import styles from './styles.css';

let {
  ref = $bindable(null),
  class: className,
  ...restProps
}: Label.RootProps = $props();
</script>

<Label.Root
  bind:ref
  data-slot="label"
  class={[
		styles.labelBase,
		className
	]}
  {...restProps}
/>
