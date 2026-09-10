<script lang="ts">
import { Copy, Check } from '@lucide/svelte';
import { Typography } from '../../Typography';
import { getDescriptionContext } from '../context';
import type { DescriptionValueProps } from '../types';

let {
  children,
  stub,
  canCopy = false,
  copyPosition = 'right',
  copyText,
  isHidePersonalData = false,
  color = 'primary',
  variant = 'body2',
  class: className,
}: DescriptionValueProps = $props();

const context = getDescriptionContext();

const align = $derived(
  context.leader || context.direction === 'row' ? 'right' : 'left',
);

let copied = $state(false);

async function copyValue(element: HTMLElement | null) {
  if (!canCopy) return;

  let textToCopy = copyText;
  if (!textToCopy && element) {
    textToCopy = element.innerText;
  }

  if (textToCopy) {
    try {
      await navigator.clipboard.writeText(textToCopy);
      copied = true;
      setTimeout(() => {
        copied = false;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }
}

function handleCopy(event: MouseEvent) {
  event.preventDefault();
  void copyValue(event.currentTarget as HTMLElement);
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.key !== 'Enter' && event.key !== ' ') return;
  event.preventDefault();
  void copyValue(event.currentTarget as HTMLElement);
}
</script>

{#snippet copyIcon()}
  {#if copied}
    <Check
      size={16}
      class="description-value-copy-icon"
      aria-label="Copy"
      data-position={copyPosition}
    />
  {:else}
    <Copy
      size={16}
      class="description-value-copy-icon"
      aria-label="Copy"
      data-position={copyPosition}
    />
  {/if}
{/snippet}

<!-- svelte-ignore a11y_no_noninteractive_tabindex: The dd becomes a keyboard-accessible button when canCopy is enabled. -->
<dd
  data-hide-personal-data={isHidePersonalData ? true : undefined}
  role={canCopy ? 'button' : undefined}
  tabindex={canCopy ? 0 : undefined}
  onclick={canCopy ? handleCopy : undefined}
  onkeydown={canCopy ? handleKeyDown : undefined}
  class={[
    "wrapper",
    {
      'can-copy': canCopy,
      'hide-personal-data': isHidePersonalData
    },
    className
  ]}
>
  {#if canCopy && copyPosition === 'left'}
    {@render copyIcon()}
  {/if}

  <Typography {color} {variant} {align}>
    {#if children}
      {@render children()}
    {:else if stub}
      {#if typeof stub === 'string'}
        {stub}
      {:else}
        {@render stub()}
      {/if}
    {:else}
      —
    {/if}
  </Typography>

  {#if canCopy && copyPosition === 'right'}
    {@render copyIcon()}
  {/if}
</dd>

<style>
.wrapper {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  overflow: hidden;
  overflow-wrap: break-word;
  hyphens: auto;
  cursor: default;
  margin: 0;
}
.can-copy {
  cursor: pointer;
}
.can-copy:hover {
  text-decoration: underline;
}
:global(.description-value-copy-icon) {
  color: var(--colors-text-secondary);
  cursor: pointer;
}
:global(.description-value-copy-icon:hover) {
  color: var(--colors-primary);
}
:global(.description-value-copy-icon[data-position="left"]) {
  margin-right: var(--spacing-1);
}
:global(.description-value-copy-icon[data-position="right"]) {
  margin-left: var(--spacing-1);
}
.hide-personal-data {
  filter: blur(4px);
  user-select: none;
}
</style>
