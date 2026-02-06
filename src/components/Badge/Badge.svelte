<script lang="ts">
import styles from './styles.css';
import type { BadgeProps } from './types';

let {
  ref = $bindable(null),
  href,
  class: className,
  variant = 'default',
  children,
  ...restProps
}: BadgeProps = $props();

const classNames = $derived([
  styles.badge,
  styles.badgeVariants[variant],
  className,
]);
</script>

<svelte:element
  this={href ? "a" : "span"}
  bind:this={ref}
  data-slot="badge"
  {href}
  class={classNames}
  {...restProps}
>
  {@render children?.()}
</svelte:element>
