<script lang="ts">
import styles from './styles.css';
import type { InputGroupInputProps } from '../types';

let {
  ref = $bindable(null),
  value = $bindable(),
  class: className,
  ...restProps
}: InputGroupInputProps = $props();

const classNames = $derived([styles.control, className]);
</script>

<input
  bind:this={ref}
  data-slot="input-group-control"
  class={classNames}
  bind:value
  {...restProps}
>
