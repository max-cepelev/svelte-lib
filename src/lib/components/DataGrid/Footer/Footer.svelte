<script lang="ts">
import type { Snippet } from 'svelte';

let {
  children,
  class: className,
}: {
  children: Snippet<[]>;
  class?: string;
} = $props();
</script>

<footer class={["footer", className]}>{@render children()}</footer>

<style>
.footer {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: var(--colors-background-paper);
  position: sticky;
  bottom: 0;
  padding: var(--spacing-2);
  border-top: 1px solid var(--colors-border);
  margin-top: auto;
}
.footer:empty {
  display: none;
}
</style>
