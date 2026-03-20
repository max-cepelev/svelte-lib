<script lang="ts">
import type { Snippet } from 'svelte';

let {
  children,
  target,
  disabled = false,
}: {
  children?: Snippet;
  target?: HTMLElement;
  disabled?: boolean;
} = $props();

let portalEl: HTMLElement | undefined = $state();

$effect(() => {
  if (!portalEl || disabled) return;
  const targetEl = target ?? document.body;
  targetEl.appendChild(portalEl);
  return () => {
    portalEl?.remove();
  };
});
</script>

{#if disabled}
  {@render children?.()}
{:else}
  <div bind:this={portalEl} data-portal="" style="display: contents;">
    {@render children?.()}
  </div>
{/if}
