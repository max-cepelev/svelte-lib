<script lang="ts">
import {
  Button,
  Dialog,
  Input,
  NotificationContainer,
  notification,
  Tooltip,
} from './components';
import './theme.css';
import './reset.css';

let { notificationTheme }: { notificationTheme?: 'light' | 'dark' } = $props();
</script>

<Button>Default</Button>
<Button
  variant="destructive"
  onclick={() => notification.error('An error occurred')}
>
  Destructive
</Button>
<Input aria-label="Invalid input" aria-invalid="true" />

<Tooltip content="Tooltip details" delayDuration={0}>
  <Button variant="outline">Tooltip trigger</Button>
</Tooltip>

<Dialog.Root>
  <Dialog.Trigger>Open dialog</Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Title>Dialog title</Dialog.Title>
    <Dialog.Description>Dialog description</Dialog.Description>
  </Dialog.Content>
</Dialog.Root>

<NotificationContainer theme={notificationTheme} />
