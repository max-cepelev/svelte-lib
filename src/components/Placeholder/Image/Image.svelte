<script lang="ts">
import styles from './styles.css';
import type { ImageProps } from './types';

let { class: className, size = 'medium', ...restProps }: ImageProps = $props();
</script>

<img {...restProps} class={[styles.wrapper, styles.sizes[size], className]}>
