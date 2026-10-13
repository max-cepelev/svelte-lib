<script module lang="ts">
import { defineMeta } from '@storybook/addon-svelte-csf';
import {
  FileUploader,
  NotificationContainer,
  type FileUploaderUploadOptions,
  type UploadedFileData,
  type UploadFile,
} from '../lib/components';

const { Story } = defineMeta({
  title: 'FileUploader',
  component: FileUploader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
});

function simulateUpload(
  fileId: string,
  file: File,
  { signal, setProgress }: FileUploaderUploadOptions,
) {
  return new Promise<UploadedFileData>((resolve, reject) => {
    const total = Math.max(file.size, 100);
    let loaded = 0;
    const abort = () => {
      window.clearInterval(interval);
      reject(new DOMException('Загрузка отменена', 'AbortError'));
    };
    const interval = window.setInterval(() => {
      loaded = Math.min(total, loaded + total / 8);
      setProgress(fileId, { loaded, total });

      if (loaded >= total) {
        window.clearInterval(interval);
        signal.removeEventListener('abort', abort);
        resolve({
          id: fileId,
          name: file.name,
          size: file.size,
          type: file.type,
        });
      }
    }, 180);

    if (signal.aborted) abort();
    else signal.addEventListener('abort', abort, { once: true });
  });
}

const attempts = new Map<string, number>();

async function failFirstUpload(
  fileId: string,
  file: File,
  options: FileUploaderUploadOptions,
) {
  const attempt = (attempts.get(fileId) ?? 0) + 1;
  attempts.set(fileId, attempt);

  if (attempt === 1) {
    await new Promise((resolve) => window.setTimeout(resolve, 500));
    throw new Error('Сервис временно недоступен');
  }

  return simulateUpload(fileId, file, options);
}

let singleFile = $state<UploadFile | null>(null);
let multipleFiles = $state<UploadFile[]>([]);
let retryFile = $state<UploadFile | null>(null);
let invalidFile = $state<UploadFile | null>({
  id: 'invalid-file',
  name: 'archive.zip',
  type: 'application/zip',
  size: 8.4 * 1024 * 1024,
  status: {
    isRestrictionError: true,
    errorMsg: 'Допустимы только PDF, PNG и JPG',
  },
});
</script>

<Story name="Single File" asChild>
  <div style="width: min(680px, 90vw)">
    <FileUploader
      bind:value={singleFile}
      label="Документ"
      accept={['.pdf', '.png', '.jpg']}
      maxFileSize={5 * 1024 * 1024}
      helperText="Добавьте один файл для проверки"
      onUploadFile={simulateUpload}
    />
  </div>
</Story>

<Story name="Multiple Files" asChild>
  <div style="width: min(680px, 90vw)">
    <FileUploader
      bind:value={multipleFiles}
      isMultiple
      maxFileCount={4}
      label="Вложения"
      accept={['image/*', '.pdf']}
      maxFileSize={10 * 1024 * 1024}
      onUploadFile={simulateUpload}
      onDeleteFile={() => Promise.resolve()}
    />
    <NotificationContainer />
  </div>
</Story>

<Story name="Upload Error And Retry" asChild>
  <div style="width: min(680px, 90vw)">
    <FileUploader
      bind:value={retryFile}
      label="Повторная загрузка"
      onUploadFile={failFirstUpload}
      getErrorMessage={(_, error) => error.message}
      helperText="Первая попытка завершится ошибкой; затем нажмите повтор"
    />
  </div>
</Story>

<Story name="Restriction Error" asChild>
  <div style="width: min(680px, 90vw)">
    <FileUploader
      bind:value={invalidFile}
      label="Документ"
      accept={['.pdf', '.png', '.jpg']}
    />
  </div>
</Story>

<Story name="Disabled" asChild>
  <div style="width: min(680px, 90vw)">
    <FileUploader
      value={null}
      label="Документ"
      isDisabled
      helperText="Загрузка недоступна"
    />
  </div>
</Story>
