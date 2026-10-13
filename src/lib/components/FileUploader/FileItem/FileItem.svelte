<script lang="ts">
import {
  DownloadIcon,
  EyeIcon,
  RefreshCwIcon,
  Trash2Icon,
  XIcon,
} from '@lucide/svelte';
import { Button } from '../../Button';
import { ProgressBar } from '../../ProgressBar';
import { Tooltip } from '../../Tooltip';
import { Typography } from '../../Typography';
import type { FileId, FileUploaderCallbacks, UploadFile } from '../types';
import { formatFileSize } from '../utils';
import { FileItemStore } from './store.svelte';

type Props = Pick<FileUploaderCallbacks, 'generateDownloadLink' | 'onView'> & {
  file: UploadFile;
  isDeleting: boolean;
  onAbort: (fileId: FileId) => void;
  onDelete: (fileId: FileId) => void;
  onRetry: (fileId: FileId) => void;
};

let {
  file,
  isDeleting,
  onAbort,
  onDelete,
  onRetry,
  onView,
  generateDownloadLink,
}: Props = $props();

const store = new FileItemStore({
  get file() {
    return file;
  },
  get onView() {
    return onView;
  },
  get generateDownloadLink() {
    return generateDownloadLink;
  },
});

$effect(() => {
  if (store.shouldSimulateProgress) return store.simulateProgress();
});

$effect(() => {
  const localFile = store.localFile;
  if (localFile) return store.createLocalUrl(localFile);
});
</script>

<li data-slot="file-uploader-file" data-state={store.state} class="item">
  <div class="content">
    <div class="meta">
      <span class="file-name" title={file.name}>
        <Typography component="span" variant="body2" weight="medium">
          {file.name}
        </Typography>
      </span>
      {#if typeof file.size === 'number'}
        <span class="file-size">
          <Typography component="span" variant="caption" color="secondary">
            {formatFileSize(file.size)}
          </Typography>
        </span>
      {/if}
    </div>

    {#if store.isLoading}
      <ProgressBar
        value={store.displayedProgress}
        aria-label="Загрузка {file.name}"
      />
    {/if}

    {#if store.errorMsg}
      <Typography component="p" variant="caption" color="error" display="block">
        {store.errorMsg}
      </Typography>
    {/if}
  </div>

  <div class="actions">
    {#if store.canAbort}
      <Tooltip content="Отменить загрузку">
        <Button
          variant="ghost"
          size="iconSmall"
          aria-label="Отменить загрузку"
          onclick={() => onAbort(file.id)}
        >
          <span class="action-icon"><XIcon /></span>
        </Button>
      </Tooltip>
    {/if}

    {#if store.canRetry}
      <Tooltip content="Повторить загрузку">
        <Button
          variant="ghost"
          size="iconSmall"
          aria-label="Повторить загрузку"
          onclick={() => onRetry(file.id)}
        >
          <span class="action-icon"><RefreshCwIcon /></span>
        </Button>
      </Tooltip>
    {/if}

    {#if store.canViewWithCallback}
      <Tooltip content="Посмотреть">
        <Button
          variant="ghost"
          size="iconSmall"
          aria-label="Посмотреть"
          onclick={store.view}
        >
          <span class="action-icon"><EyeIcon /></span>
        </Button>
      </Tooltip>
    {:else if store.canViewWithLink}
      <Tooltip content="Посмотреть">
        <Button
          variant="ghost"
          size="iconSmall"
          href={store.downloadLink}
          target="_blank"
          rel="noreferrer"
          aria-label="Посмотреть"
        >
          <span class="action-icon"><EyeIcon /></span>
        </Button>
      </Tooltip>
    {/if}

    {#if store.canDownload}
      <Tooltip content="Скачать">
        <Button
          variant="ghost"
          size="iconSmall"
          href={store.downloadLink}
          download={file.name}
          aria-label="Скачать"
        >
          <span class="action-icon"><DownloadIcon /></span>
        </Button>
      </Tooltip>
    {/if}

    {#if store.canDelete}
      <Tooltip content="Удалить">
        <Button
          variant="ghost"
          size="iconSmall"
          loading={isDeleting}
          aria-label="Удалить"
          onclick={() => onDelete(file.id)}
        >
          <span class="action-icon"><Trash2Icon /></span>
        </Button>
      </Tooltip>
    {/if}
  </div>
</li>

<style>
@layer max-ts-svelte-components {
  .item {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    min-width: 0;
    align-items: center;
    gap: var(--spacing-2);
    padding: var(--spacing-2) var(--spacing-3);
    border: 1px solid var(--colors-border);
    border-radius: var(--radius-medium);
    background-color: var(--colors-background-paper);
    &[data-state="error"] {
      border-color: color-mix(in oklch, var(--colors-error) 52%, transparent);
      background-color: color-mix(
        in oklch,
        var(--colors-error) 4%,
        transparent
      );
    }
  }
  .content {
    display: flex;
    min-width: 0;
    flex-direction: column;
    gap: var(--spacing-2);
  }
  .meta {
    display: flex;
    min-width: 0;
    align-items: baseline;
    gap: var(--spacing-2);
  }
  .file-name {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .file-size {
    flex-shrink: 0;
    white-space: nowrap;
  }
  .actions {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: flex-end;
    gap: var(--spacing-1);
  }
  .action-icon {
    display: inline-flex;
    color: var(--colors-text-secondary);
  }
}
</style>
