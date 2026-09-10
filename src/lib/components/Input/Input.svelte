<script lang="ts">
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
    class={["file-input", `size-${size}`, className]}
    type="file"
    bind:files
    bind:value
    {...restProps}
  >
{:else}
  <input
    bind:this={ref}
    data-slot={dataSlot}
    class={["input", `size-${size}`, className]}
    {type}
    bind:value
    {...restProps}
  >
{/if}

<style>
.input {
  background-color: var(--colors-background-paper);
  border: 1px solid var(--colors-border);
  border-radius: var(--radius-medium);
  color: var(--colors-text-primary);
  font-size: var(--fontSize-base);
  font-weight: var(--fontWeight-normal);
  line-height: var(--lineHeight-normal);
  min-width: 0;
  transition:
    color 0.2s,
    border-color 0.2s,
    box-shadow 0.2s;
  outline: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: var(--shadow-1);
}
.input::placeholder {
  color: var(--colors-text-hint);
}
.input:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
.input:focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
  box-shadow: var(--shadow-2);
  border-color: var(--colors-primary);
}
.input[aria-invalid="true"] {
  border-color: var(--colors-error);
  box-shadow: 0 0 0 3px var(--colors-error) 20;
}
.input:hover:not(:disabled) {
  border-color: var(--colors-primary);
}
.input::selection {
  background-color: var(--colors-primary);
  color: var(--colors-foreground-primary);
}
.size-small {
  padding: 0.125rem var(--spacing-2);
  height: 28px;
  font-size: var(--fontSize-sm);
}
.size-medium {
  padding: var(--spacing-1) var(--spacing-3);
  height: 36px;
  font-size: var(--fontSize-base);
}
.size-large {
  padding: var(--spacing-2) var(--spacing-4);
  height: 44px;
  font-size: var(--fontSize-lg);
}
.file-input {
  background-color: var(--colors-background-paper);
  border: 1px solid var(--colors-border);
  border-radius: var(--radius-medium);
  color: var(--colors-text-primary);
  font-size: var(--fontSize-base);
  font-weight: var(--fontWeight-medium);
  width: 100%;
  min-width: 0;
  transition:
    color 0.2s,
    border-color 0.2s,
    box-shadow 0.2s;
  outline: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
.file-input::selection {
  background-color: var(--colors-primary);
  color: var(--colors-foreground-primary);
}
.file-input:focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
  box-shadow: 0 0 0 3px var(--colors-primary) 20;
  border-color: var(--colors-primary);
}
.file-input:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
.file-input::placeholder {
  color: var(--colors-text-hint);
}
.file-input[aria-invalid="true"] {
  border-color: var(--colors-error);
  box-shadow: 0 0 0 3px var(--colors-error) 20;
}
.file-input::-webkit-file-upload-button {
  cursor: pointer;
  background-color: transparent;
  border: none;
}
</style>
