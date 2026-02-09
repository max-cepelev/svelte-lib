<script lang="ts">
import styles from './styles.css';
import type { InputGroupProps } from './types';

let {
  ref = $bindable(null),
  class: className,
  children,
  disabled = false,
  ...restProps
}: InputGroupProps = $props();

const classNames = $derived([styles.container, className]);
</script>

<div
  bind:this={ref}
  role="group"
  data-slot="input-group"
  data-disabled={disabled ? 'true' : undefined}
  aria-disabled={disabled}
  class={classNames}
  {...restProps}
>
  {@render children?.()}
</div>
