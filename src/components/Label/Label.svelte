<script lang="ts">
import { Label } from 'bits-ui';
import styles from './styles.css';
import type { LabelProps } from './types';

let {
  ref = $bindable(null),
  class: className,
  required,
  ...restProps
}: LabelProps = $props();
</script>

<Label.Root
  bind:ref
  data-slot="label"
  class={[
		styles.labelBase,
		{ [styles.required]: required },
		className
	]}
  {...restProps}
/>
