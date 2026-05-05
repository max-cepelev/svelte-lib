<script lang="ts">
import { Copy, Check } from '@lucide/svelte';
import { Typography } from '../../Typography';
import { getDescriptionContext } from '../context';
import type { DescriptionValueProps } from '../types';

import * as styles from './styles.css';

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

async function handleCopy(event: MouseEvent) {
  if (!canCopy) return;
  event.preventDefault();

  let textToCopy = copyText;
  if (!textToCopy && event.currentTarget instanceof HTMLElement) {
    textToCopy = event.currentTarget.innerText;
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
</script>

{#snippet copyIcon()}
  {#if copied}
    <Check
      size={16}
      class={styles.copyIcon}
      aria-label="Copy"
      data-position={copyPosition}
    />
  {:else}
    <Copy
      size={16}
      class={styles.copyIcon}
      aria-label="Copy"
      data-position={copyPosition}
    />
  {/if}
{/snippet}

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dd
  data-hide-personal-data={isHidePersonalData ? true : undefined}
  onclick={handleCopy}
  class={[
    styles.wrapper,
    {
      [styles.canCopy]: canCopy,
      [styles.hidePersonalData]: isHidePersonalData
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
