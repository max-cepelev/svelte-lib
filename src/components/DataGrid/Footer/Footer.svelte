<script lang="ts">
import type { Snippet } from 'svelte';
import styles from './styles.css';

let {
  children,
  class: className,
}: {
  children: Snippet<[]>;
  class?: string;
} = $props();
</script>

<footer class={[styles.footer, className]}>{@render children()}</footer>
