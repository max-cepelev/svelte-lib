<script lang="ts">
import { Button } from '../../Button/index.js';
import { CircularProgress } from '../../CircularProgress/index.js';
import { Placeholder } from '../../Placeholder/index.js';
import styles from './styles.css.js';
import type { StateProps } from './types.js';

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
  <tr class={styles.container}>
    <td colSpan={columnsLength} align="center"><span class={styles.loader}>
      <CircularProgress />
    </span></td>
  </tr>
{:else if isEmpty}
  <tr class={styles.container}>
    <td colSpan={columnsLength} align="center">
      <Placeholder
        title={emptyStateData.text}
        imgSrc={emptyStateData.imgSrc}
        imgAlt={emptyStateData.imgAlt}
      />
    </td>
  </tr>
{:else if isError}
  <tr class={styles.container}>
    <td colSpan={columnsLength} align="center">
      <Placeholder
        title={errorStateData.text}
        imgSrc={errorStateData.imgSrc}
        imgAlt={errorStateData.imgAlt}
        actions={actions}
      />
    </td>
  </tr>
{/if}
