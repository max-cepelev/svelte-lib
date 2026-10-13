<script lang="ts">
import { UploadIcon } from '@lucide/svelte';
import { Label } from '../Label';
import { notification } from '../Notification';
import { Typography } from '../Typography';
import { FileItem } from './FileItem';
import { FileUploaderStore } from './store.svelte';
import type { FileUploaderProps } from './types';

let {
  ref = $bindable(null),
  inputRef = $bindable(null),
  value = $bindable(),
  onValueChange,
  isMultiple = false,
  maxFileCount,
  name,
  label,
  accept = [],
  maxFileSize,
  isDisabled = false,
  isError = false,
  required,
  helperText,
  restrictions,
  placeholder,
  notify = notification,
  generateDownloadLink,
  onUploadFile,
  onDeleteFile,
  onView,
  getErrorMessage,
  class: className,
  ...restProps
}: FileUploaderProps = $props();

const id = $props.id();
const inputId = `${id}-input`;
const helperTextId = `${id}-helper-text`;

const store = new FileUploaderStore({
  id,
  get value() {
    return value;
  },
  get isMultiple() {
    return isMultiple;
  },
  get maxFileCount() {
    return maxFileCount;
  },
  get accept() {
    return accept;
  },
  get maxFileSize() {
    return maxFileSize;
  },
  get restrictions() {
    return restrictions;
  },
  get isDisabled() {
    return isDisabled;
  },
  get notify() {
    return notify;
  },
  get onUploadFile() {
    return onUploadFile;
  },
  get onDeleteFile() {
    return onDeleteFile;
  },
  get getErrorMessage() {
    return getErrorMessage;
  },
  setValue(nextValue, metaInfo) {
    value = nextValue as typeof value;
    onValueChange?.(nextValue as never, metaInfo);
  },
});

$effect(() => store.syncControllers());
$effect(() => () => store.destroy());

const handleInputChange = (
  event: Event & { currentTarget: HTMLInputElement },
) => {
  const input = event.currentTarget;
  if (input.files) store.addFiles(input.files, 'fileInput');
  input.value = '';
};

const handleDragEnter = (event: DragEvent) => {
  event.preventDefault();
  store.dragEnter(event.dataTransfer?.types ?? []);
};

const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
  if (!isDisabled && event.dataTransfer) event.dataTransfer.dropEffect = 'copy';
};

const handleDragLeave = (event: DragEvent) => {
  event.preventDefault();
  store.dragLeave();
};

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  store.drop(event.dataTransfer?.files ?? []);
};
</script>

<div
  {...restProps}
  bind:this={ref}
  data-slot="file-uploader"
  class={['root', className]}
>
  {#if label != null}
    <Label
      for={inputId}
      data-disabled={isDisabled ? 'true' : undefined}
      {required}
    >
      {#if typeof label === 'string'}
        {label}
      {:else}
        {@render label()}
      {/if}
    </Label>
  {/if}

  <fieldset
    data-slot="file-uploader-dropzone"
    aria-label="Загрузка файлов"
    data-active={store.isDragActive ? '' : undefined}
    data-error={isError ? '' : undefined}
    data-disabled={isDisabled ? '' : undefined}
    class="dropzone"
    ondragenter={handleDragEnter}
    ondragover={handleDragOver}
    ondragleave={handleDragLeave}
    ondrop={handleDrop}
  >
    <input
      bind:this={inputRef}
      data-slot="file-uploader-input"
      id={inputId}
      class="input"
      type="file"
      {name}
      accept={accept.join(',')}
      multiple={isMultiple}
      disabled={isDisabled || store.isLimitReached}
      required={required && store.files.length === 0}
      aria-label="Загрузить"
      aria-invalid={isError || undefined}
      aria-describedby={helperText != null ? helperTextId : undefined}
      onchange={handleInputChange}
    >

    {#if store.files.length > 0}
      <ul data-slot="file-uploader-list" class="file-list">
        {#each store.files as file (file.id)}
          <FileItem
            {file}
            isDeleting={store.deletingFileIds.has(file.id)}
            onAbort={store.abortUpload}
            onDelete={store.deleteFile}
            onRetry={store.retryUpload}
            {onView}
            {generateDownloadLink}
          />
        {/each}
      </ul>
    {/if}

    {#if !store.isLimitReached}
      <div
        data-slot="file-uploader-prompt"
        data-has-files={store.files.length ? '' : undefined}
        class="prompt"
      >
        <button
          type="button"
          class="upload-button"
          disabled={isDisabled}
          aria-label="Выбрать файл"
          onclick={() => inputRef?.click()}
        >
          <UploadIcon />
        </button>
        <div class="prompt-content">
          {#if typeof placeholder === 'function'}
            {@render placeholder()}
          {:else}
            <Typography
              component="p"
              variant="body2"
              weight="medium"
              align="center"
              color="muted"
            >
              {store.isDragActive
                ? 'Отпустите файлы, чтобы добавить'
                : (placeholder ?? store.defaultPrompt)}
            </Typography>
          {/if}
          {#if store.constraints}
            <Typography
              component="p"
              variant="caption"
              color="muted"
              align="center"
            >
              {store.constraints}
            </Typography>
          {/if}
        </div>
      </div>
    {:else}
      <div class="limit-notice">
        <Typography component="p" variant="caption" color="secondary">
          {store.limitNotice}
        </Typography>
      </div>
    {/if}
  </fieldset>

  {#if helperText != null}
    <Typography
      id={helperTextId}
      component="p"
      variant="caption"
      color={isError ? 'error' : 'secondary'}
      display="block"
    >
      {#if typeof helperText === 'string'}
        {helperText}
      {:else}
        {@render helperText()}
      {/if}
    </Typography>
  {/if}
</div>

<style>
@layer max-ts-svelte-components {
  .root {
    display: flex;
    width: 100%;
    min-width: 0;
    flex-direction: column;
    gap: var(--spacing-2);
  }
  .dropzone {
    box-sizing: border-box;
    display: flex;
    min-width: 0;
    margin: 0;
    flex-direction: column;
    justify-content: center;
    gap: var(--spacing-3);
    padding: var(--spacing-3);
    border: 1px dashed var(--colors-border);
    border-radius: var(--radius-medium);
    background-color: var(--colors-background-paper);
    transition:
      border-color 150ms,
      background-color 150ms,
      box-shadow 150ms;
    &[data-active] {
      border-color: var(--colors-info);
      background-color: color-mix(in oklch, var(--colors-info) 6%, transparent);
      box-shadow: inset 0 0 0 1px
        color-mix(in oklch, var(--colors-info) 24%, transparent);
    }
    &[data-error] {
      border-color: var(--colors-error);
      background-color: color-mix(
        in oklch,
        var(--colors-error) 4%,
        transparent
      );
    }
    &[data-disabled] {
      cursor: not-allowed;
      opacity: 0.6;
    }
    &:focus-within {
      border-color: var(--colors-info);
      box-shadow: 0 0 0 3px
        color-mix(in oklch, var(--colors-info) 16%, transparent);
    }
  }
  .input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  .file-list {
    display: grid;
    min-width: 0;
    margin: 0;
    padding: 0;
    list-style: none;
    gap: var(--spacing-2);
  }
  .prompt {
    display: flex;
    flex-direction: column;
    min-width: 0;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-3);
    &[data-has-files] {
      padding-top: var(--spacing-3);
      border-top: 1px solid var(--colors-border);
    }
  }
  .prompt-content {
    display: flex;
    min-width: 0;
    flex: 1 1 auto;
    flex-direction: column;
    gap: var(--spacing-1);
  }
  .upload-button {
    display: inline-flex;
    width: var(--spacing-10);
    height: var(--spacing-10);
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--colors-border);
    border-radius: var(--radius-medium);
    background-color: var(--colors-background-element);
    color: var(--colors-text-secondary);
    cursor: pointer;
    transition: background-color 0.2s;
    &:hover {
      background-color: var(--colors-background-elementHover);
    }
    &:focus-visible {
      outline: 2px solid transparent;
      outline-offset: 2px;
      box-shadow: var(--elevation-1);
    }
    &:disabled {
      pointer-events: none;
    }
  }
  .limit-notice {
    padding: var(--spacing-1) var(--spacing-2);
    text-align: center;
  }
}
</style>
