<script lang="ts">
import styles from './styles.css';
import type { InputGroupTextProps } from '../types';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: InputGroupTextProps = $props();

const classNames = $derived([styles.text, className]);
</script>

<span bind:this={ref} class={classNames} {...restProps}>
  {@render children?.()}
</span>
