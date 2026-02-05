<script lang="ts">
import styles from './styles.css.js';
import type { ButtonProps } from './types.js';

let {
  ref = $bindable(null),
  variant = 'default',
  size = 'medium',
  type = 'button',
  href = undefined,
  children,
  loading = false,
  fullWidth = false,
  class: className,
  disabled,
  ...restProps
}: ButtonProps = $props();

const classNames = $derived([
  styles.buttonVariants[variant],
  styles.buttonSizes[size],
  {
    [styles.loading]: loading,
    [styles.fullWidth]: fullWidth,
  },
  className,
]);
</script>

{#if href}
  <a
    bind:this={ref}
    data-slot="button"
    class={classNames}
    href={disabled ? undefined : href}
    aria-disabled={disabled}
    role={disabled ? "link" : undefined}
    tabindex={disabled ? -1 : undefined}
  >
    {@render children?.()}
  </a>
{:else}
  <button
    bind:this={ref}
    data-slot="button"
    aria-disabled={disabled}
    class={classNames}
    {type}
    {disabled}
    {...restProps}
  >
    {@render children?.()}
  </button>
{/if}
