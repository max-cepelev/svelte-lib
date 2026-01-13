<script lang="ts">
import styles from './styles.css.js';
import type { ImageProps } from './types.js';

let { class: className, size = 'medium', ...restProps }: ImageProps = $props();
</script>

<img {...restProps} class={[styles.wrapper, styles.sizes[size], className]} />