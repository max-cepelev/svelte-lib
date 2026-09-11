<script lang="ts">
import { Typography } from '../../Typography';
import { getDescriptionContext } from '../context';

import type { DescriptionNameProps } from '../types';

let {
  children,
  color = 'secondary',
  variant = 'body2',
  class: className,
}: DescriptionNameProps = $props();

const context = getDescriptionContext();
const leader = $derived(context.leader);
const direction = $derived(context.direction);

const showSeparator = $derived(!leader && direction !== 'column');
</script>

<dt
  class={[
		"wrapper",
		{ 'leader': leader },
		className,
	]}
>
  <Typography {color} {variant} component="span">
    {@render children?.()}
  </Typography>
  {#if showSeparator}
    <span class="separator">{context.separator}</span>
  {/if}
</dt>
{#if leader}
  <div class="dashed-separator"></div>
{/if}

<style>
@layer max-ts-svelte-components {
  @media (max-width: 600px) {
    .separator {
      display: none;
    }
  }

  .wrapper {
    flex-shrink: 0;
    align-self: flex-start;
    margin-right: var(--spacing-2);
    max-width: calc(100% - 12px);
  }

  .leader {
    max-width: calc(100% - 36px);
  }

  .dashed-separator {
    flex: 1;
    align-self: flex-end;
    min-width: 12px;
    height: 4px;
    margin-bottom: var(--spacing-1);
    margin-right: var(--spacing-2);
    border-bottom: 1px dashed var(--colors-border);
  }

  @media (max-width: 600px) {
    .dashed-separator {
      display: none;
    }
  }
}
</style>
