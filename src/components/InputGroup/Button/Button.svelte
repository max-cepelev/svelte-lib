<script lang="ts">
import Button from '../../Button/Button.svelte';
import styles from './styles.css';
import type { InputGroupButtonProps, InputGroupButtonSize } from '../types';
import type { ButtonSize } from '../../Button/types';

const buttonSizeMap: Record<InputGroupButtonSize, ButtonSize> = {
  sm: 'small',
  xs: 'small',
  'icon-sm': 'icon',
  'icon-xs': 'iconSmall',
};

let {
  ref = $bindable(null),
  class: className,
  children,
  size = 'xs',
  variant = 'ghost',
  type = 'button',
  ...restProps
}: InputGroupButtonProps = $props();

const classNames = $derived([styles.base, styles.sizes[size], className]);
</script>

<Button
  bind:ref
  size={buttonSizeMap[size]}
  {variant}
  {type}
  class={classNames}
  {...restProps}
>
  {@render children?.()}
</Button>
