<script lang="ts">
import { Button } from '../../Button';
import { CircularProgress } from '../../CircularProgress';
import { Placeholder } from '../../Placeholder';

import type { StateProps } from './types';

let {
  isLoading,
  isEmpty,
  columnsLength,
  emptyState,
  errorState,
  isError,
  onRetry,
}: StateProps = $props();

const emptyStateData = $derived(emptyState || { text: 'Нет данных' });
const errorStateData = $derived(errorState || { text: 'Произошла ошибка' });
</script>

{#snippet actions()}
  {#if onRetry}
    <Button onclick={onRetry}>Повторить попытку</Button>
  {:else}
    undefined
  {/if}
{/snippet}

{#if isLoading}
  <tr class="container">
    <td colSpan={columnsLength} align="center">
      <span class="loader"> <CircularProgress /> </span>
    </td>
  </tr>
{:else if isEmpty}
  <tr class="container">
    <td colSpan={columnsLength} align="center">
      <Placeholder
        title={emptyStateData.text}
        imgSrc={emptyStateData.imgSrc}
        imgAlt={emptyStateData.imgAlt}
      />
    </td>
  </tr>
{:else if isError}
  <tr class="container">
    <td colSpan={columnsLength} align="center">
      <Placeholder
        title={errorStateData.text}
        imgSrc={errorStateData.imgSrc}
        imgAlt={errorStateData.imgAlt}
        {actions}
      />
    </td>
  </tr>
{/if}

<style>
.container {
  width: 100%;
  height: 100%;
}
.loader {
  height: 100%;
  min-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
