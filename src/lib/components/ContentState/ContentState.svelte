<script lang="ts">
import { Button } from '../Button';
import { Placeholder } from '../Placeholder';
import Spinner from '../Spinner/Spinner.svelte';

import type { ContentStateProps } from './types';

let {
  isLoading,
  isError,
  isCustom,
  errorState,
  customState,
  children,
  loadingContent,
}: ContentStateProps = $props();
</script>

{#snippet actionSnippet()}
  <Button onclick={errorState?.onRetry}>Попробовать снова</Button>
{/snippet}

{#if isLoading}
  <div class="loading-container">
    {#if loadingContent}
      {loadingContent}
    {:else}
      <Spinner />
    {/if}
  </div>
{:else if isCustom && customState}
  <Placeholder {...customState} />
{:else if isError && errorState}
  <Placeholder
    title={errorState.title || 'Произошла ошибка'}
    description={errorState.errorList.join(', ')}
    imgAlt={errorState.imgAlt}
    imgSrc={errorState.imgSrc}
    actions={errorState.actions || actionSnippet}
  />
{:else}
  {@render children?.()}
{/if}

<style>
@layer max-ts-svelte-components {
  .loading-container {
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
}
</style>
