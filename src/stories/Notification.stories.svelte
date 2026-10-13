<script module lang="ts">
import { defineMeta } from '@storybook/addon-svelte-csf';
import { Button, NotificationContainer, notification } from '../lib/components';

const { Story } = defineMeta({
  title: 'Notification',
  component: NotificationContainer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
});
</script>

<Story name="Variants" asChild>
  <div style="display: flex; flex-wrap: wrap; gap: 8px">
    <Button
      variant="outline"
      onclick={() => notification.success('Файл загружен')}
    >
      Success
    </Button>
    <Button
      variant="outline"
      onclick={() => notification.error('Ошибка удаления файла')}
    >
      Error
    </Button>
    <Button
      variant="outline"
      onclick={() =>
        notification.warning('Не все файлы добавлены', {
          content: 'Можно загрузить не более 4',
        })}
    >
      Warning
    </Button>
    <Button
      variant="outline"
      onclick={() => notification.info('Загрузка начнётся автоматически')}
    >
      Info
    </Button>
    <Button
      variant="outline"
      onclick={() => notification.message('Сохранено', 'Изменения применены')}
    >
      Message
    </Button>
    <Button
      variant="outline"
      onclick={() =>
        notification.action({
          title: 'Файл удалён',
          buttonLabel: 'Отменить',
          onClick: () => notification.info('Удаление отменено'),
        })}
    >
      Action
    </Button>
  </div>
  <NotificationContainer />
</Story>
