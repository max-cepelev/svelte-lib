<script lang="ts">
import styles from './styles.css';
import type { InputGroupTextareaProps } from '../types';

let {
  ref = $bindable(null),
  value = $bindable(),
  class: className,
  ...restProps
}: InputGroupTextareaProps = $props();

const classNames = $derived([styles.textarea, className]);
</script>

<textarea
  bind:this={ref}
  data-slot="input-group-control"
  class={classNames}
  bind:value
  {...restProps}
></textarea>
