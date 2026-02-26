<script lang="ts">
import styles from './styles.css';
import type { ImageProps } from './types';

let {
  class: className,
  size = 'medium',
  alt: altAttr = '',
  ...restProps
}: ImageProps = $props();
</script>

<img
  {...restProps}
  alt={altAttr}
  class={[styles.wrapper, styles.sizes[size], className]}
>
