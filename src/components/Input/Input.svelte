<script lang="ts">
import styles from './styles.css';
import type { InputProps } from './types';

let {
  ref = $bindable(null),
  value = $bindable(),
  type,
  files = $bindable(),
  size = 'medium',
  class: className,
  'data-slot': dataSlot = 'input',
  ...restProps
}: InputProps = $props();
</script>

{#if type === "file"}
  <input
    bind:this={ref}
    data-slot={dataSlot}
    class={[styles.fileInput, styles.sizes[size], className]}
    type="file"
    bind:files
    bind:value
    {...restProps}
  >
{:else}
  <input
    bind:this={ref}
    data-slot={dataSlot}
    class={[styles.inputBase, styles.sizes[size], className]}
    {type}
    bind:value
    {...restProps}
  >
{/if}
